import React, {useState, useEffect, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import Project from './Project'
import NewProjectForm from '../Components/NewProjectForm'
import ProjectDetail from '../Pages/ProjectDetail'
import SlideUpWindow from '../Components/SlideUpWindow'

const Projects = () => {
    const token = useContext(AuthorizationContext).user.token
    
    const [targetProjectId, setTargetProjectId] = useState(null)
    const [projects, setProjects] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [error, setError] = useState(true)
    const [showDetails, setShowDetails] = useState(false)


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
        setShowDetails(true)
    }
    
    return (
        <div className="min-h-screen justify-center bg-gray-100">
            <div className="max-w-md w-full relative">
                <div className="text-center">
                    <button onClick={toggleShowCreateForm}>Create New Project</button>
                        { showCreateForm &&
                            <NewProjectForm onSuccess={newProject => updateProjects(newProject)} onFailure={()=>{}}/>
                        }
                    <h2>Top Projects</h2>
                </div>   
                <div className="flex justify-center bg-gray-100 py-6 px-0 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-1 justify-evenly w-full">
                        <div className="flex flex-col">
                            {
                                error 
                                ?<div>
                                    <p>Error finding Projects</p>
                                </div> 
                                : projects.length > 0 &&
                                <ul className="rounded-sm border shadow-md divide-y-2 bg-white">
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
                        <SlideUpWindow isShowing={showDetails} setIsShowing={setShowDetails}>
                            <ProjectDetail projectId={targetProjectId} />
                        </SlideUpWindow>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
