import React, {useState, useEffect, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import Project from './Project'
import NewProjectForm from '../Components/NewProjectForm'
import ProjectDetail from '../Pages/ProjectDetail'

const Projects = () => {
    const token = useContext(AuthorizationContext).user.token
    
    const [targetProjectId, setTargetProjectId] = useState(null)
    const [projects, setProjects] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [error, setError] = useState(true)

    useEffect(()=>{
        const fetchProjects = async () => {
            const res = await query.get('/projects', token)
            if (res.error){
                setError(true)
                return
            }
            setError(false)
            setProjects(res.projects)
            console.log(res.projects)
            setTargetProjectId(res.projects[0].project_id)
        }
        fetchProjects()
    }, [token])
    
    const toggleShowCreateForm = () => {
        setShowCreateForm(!showCreateForm)
    } 

    const updateProjects = (newProject) => {
        setProjects([...projects, newProject])
        setShowCreateForm(false)
        setError(false)
    }

    const selectProject = (projectId) => {
        setTargetProjectId(projectId)
    }
    
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <div>
                <button onClick={toggleShowCreateForm}>Create New Project</button>
                { showCreateForm &&
                    <NewProjectForm onSuccess={newProject => updateProjects(newProject)} onFailure={()=>{}}/>
                }
                <h2>Top Projects</h2>
                {
                    error 
                    ?<div>
                        <p>Error finding Projects</p>
                    </div> 
                    : projects.length > 0 &&
                    <ul>
                        {projects.map(project => {
                            return(
                                <Project 
                                    project_description={project.project_description}
                                    project_id={project.project_id}
                                    project_name={project.project_name}
                                    key={project.project_id}
                                    selectProject={selectProject}
                                />
                            )
                        })}
                    </ul>
                }
            </div>
            { targetProjectId && <ProjectDetail projectId={targetProjectId}/>}
        </div>
    )
}

export default Projects
