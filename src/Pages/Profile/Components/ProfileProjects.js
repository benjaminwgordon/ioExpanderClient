import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import NewProjectForm from '../../../Components/NewProjectForm'
import query from '../../../query'
import { PlusIcon, TemplateIcon } from '@heroicons/react/outline'
import ProjectDetail from '../../ProjectDetail'
import SlideUpWindow from '../../../Components/SlideUpWindow'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const ProfileProjects = (props) => {

    const token = useContext(authenticationContext).user.token

    const {targetUserId, isOwnedProfile} = props
    const [projects, setProjects] = useState(null)
    const [showAddProject, setShowAddProject] = useState(false)
    const [showProjectDetail, setShowProjectDetail] = useState(false)
    const [targetProject, setTargetProject] = useState(null)

    const selectProject = (project_id) => {
        setShowProjectDetail(true)
        setTargetProject(project_id)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await query.get(`/users/${targetUserId}/projects`, token)
            setProjects(res.usersProjects) 
        }
        fetchProjects()
    }, [targetUserId, token])

    const toggleNewProjectMode = () => {
        setShowAddProject(!showAddProject)
    }

    const handleNewProject = (newProject) => {
        setProjects([newProject, ...projects])
        setShowAddProject(false)
    }

    return (
        <div>
           <div className="flex justify-between px-2 py-2 border-b border-gray-400 w-full">
                <h3 className="font-bold text-xl ">
                    Projects
                </h3>
                {
                    isOwnedProfile && 
                    <button onClick={toggleNewProjectMode}>
                        <PlusIcon className="block h-8 w-8"/>
                    </button>
                }
            </div>
            {showAddProject &&
                <SlideUpWindow isShowing={showAddProject} setIsShowing={setShowAddProject} windowTitle="New Project">
                    <NewProjectForm onSuccess={(newProject) => handleNewProject(newProject)} onFailure={()=>{}} close={()=>setShowAddProject(false)}/>
                </SlideUpWindow>
            }
            <div className="flex flex-row">
                {
                    !projects
                    ? <LoadingSpinner />
                    : <div className=" w-full lg:w-1/3 overflow-y-scroll">
                        {projects.map(project => {
                            return(
                                <div key={project.project_name} className="py-1">
                                    <div onClick={() => selectProject(project.project_id)} className="flex flex-row ">
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
        </div>
    )
}

export default ProfileProjects
