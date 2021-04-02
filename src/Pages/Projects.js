import React, {useState, useEffect, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import Project from './Project'
import NewProjectForm from '../Components/NewProjectForm'

const Projects = () => {
    const token = useContext(AuthorizationContext).user.token
    
    const [projects, setProjects] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(()=>{
        const fetchProjects = async () => {
            const res = await query.get('/projects', token)
            setProjects(res.projects)
        }
        fetchProjects()
    }, [token])
    
    const toggleShowCreateForm = () => {
        setShowCreateForm(!showCreateForm)
    } 

    const updateProjects = (newProject) => {
        setProjects([...projects, newProject])
    }
    
    return (
        <div>
            <button onClick={toggleShowCreateForm}>Create New Project</button>
            { showCreateForm &&
                <NewProjectForm onSuccess={newProject => updateProjects(newProject)} onFailure={()=>{}}/>
            }
            {
                (projects.length > 0) && 
                <ul>
                    {projects.map(project => {
                        return(
                            <Project 
                                project_description={project.project_description}
                                project_id={project.project_id}
                                project_name={project.project_name}
                                key={project.project_id}
                            />
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default Projects
