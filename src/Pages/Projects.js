import React, {useState, useEffect, useContext, useRef} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import ProjectDetail from '../Pages/ProjectDetail'
import SlideUpWindow from '../Components/SlideUpWindow'
import Page from '../Components/Page'
import LoadingSpinner from '../Components/LoadingSpinner'
import { TemplateIcon } from '@heroicons/react/outline'
import {Link} from 'react-router-dom'
import NewProjectForm from '../Components/NewProjectForm'

const Projects = (props) => {
    const token = useContext(AuthorizationContext).user.token
    
    const [projects, setProjects] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showProjectDetail, setShowProjectDetail] = useState(false)
    const [targetProject, setTargetProject] = useState(null)
    const ref = useRef(null)
    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false)

    const toggleShowCreateProjectForm = () => {
        setShowCreateProjectForm(!showCreateProjectForm)
    }

    useEffect(()=>{
        const fetchProjects = async () => {
            const res = await query.get('/projects', token)
            if (res.error){
                return
            }
            setProjects(res)
        }
        fetchProjects()
    }, [token])

    useEffect(()=>{
        if (projects && projects[0]){
            setTargetProject(projects[0].project_id)
            if (ref.current.clientWidth > 1040){
                setShowProjectDetail(true)
            }
        }
    }, [projects])

    const selectProject = (project_id) => {
        setShowProjectDetail(true)
        setTargetProject(project_id)
    }
    
    return (
        <Page >
            <div ref={ref}>
                <div className="flex justify-between px-2 py-2 border-b border-gray-400 w-full flex flex-row justify-between">
                    <h3 className="font-bold text-xl ">
                        Projects
                    </h3>
                    <button onClick={toggleShowCreateProjectForm} className="p-2 rounded-md bg-green-400 text-white">{showCreateProjectForm ? "View Projects" : "Create Project"}</button>
                </div>
                <div className="flex flex-row">
                    {
                        !projects
                        ? <LoadingSpinner />
                        : <div className="w-full lg:w-1/3 overflow-y-scroll">
                            {projects.map(project => {
                                const isActiveProject = (project.project_id === targetProject)
                                return(
                                    <div key={project.project_name} className={`py-1 ${isActiveProject && "bg-blue-100"}`}>
                                        <div onClick={() => selectProject(project.project_id)} className="flex flex-row">
                                            <div className="w-1/6 text-center px-4 mt-auto mb-auto">
                                                <TemplateIcon className="w-8 h-8"/>
                                            </div>
                                            <div className="w-full">
                                                <h4 className="font-bold">{project.project_name}</h4>
                                                <p className="font-light border-b-2 text-sm pb-1 pr-2">{project.project_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <div className="lg:w-2/3 overflow-y-scroll">
                        <SlideUpWindow isShowing={showProjectDetail} setIsShowing={setShowProjectDetail}>
                            <ProjectDetail projectId={targetProject} close={() => setShowProjectDetail(false)}/>
                        </SlideUpWindow>
                    </div>

                </div>

                <div className="lg:w-full lg:absolute lg:top-0 lg:left-0 overflow-y-scroll">
                    <SlideUpWindow isShowing={showCreateProjectForm} setIsShowing={setShowCreateProjectForm}>
                        <NewProjectForm close={() => setShowCreateProjectForm(false)}/>
                    </SlideUpWindow>
                </div>
            </div>
        </Page>
    )
}

export default Projects
