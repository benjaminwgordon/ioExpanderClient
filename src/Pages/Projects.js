import React, {useState, useEffect, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import Project from './Project'
import NewProjectForm from '../Components/NewProjectForm'
import ProjectDetail from '../Pages/ProjectDetail'
import SlideUpWindow from '../Components/SlideUpWindow'
import Page from '../Components/Page'
import Button from './Profile/Components/Button'
import LoadingSpinner from '../Components/LoadingSpinner'

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
        <Page>
            <div className="justify-center">
                <div className="text-center">
                    <Button onClick={toggleShowCreateForm}>
                        Create New Project
                    </Button>
                    <SlideUpWindow isShowing={showCreateForm} setIsShowing={setShowCreateForm}>
                        <NewProjectForm onSuccess={newProject => updateProjects(newProject)} onFailure={()=>{}}/>
                    </SlideUpWindow>
                    <h2>Top Projects</h2>
                </div>   
                <div className="flex justify-center py-6 px-0 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 justify-evenly w-full">
                        <div className="flex flex-col">
                            {
                                error 
                                ? <LoadingSpinner /> 
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
                        <div className="col-span-2">
                            <SlideUpWindow isShowing={showDetails} setIsShowing={setShowDetails} >
                                <ProjectDetail projectId={targetProjectId} />
                            </SlideUpWindow>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Projects
