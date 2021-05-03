import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import NewProjectForm from '../../../Components/NewProjectForm'
import query from '../../../query'
import { PencilIcon, PlusIcon } from '@heroicons/react/outline'
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

    const toggleEditMode = () => {
        setShowAddProject(!showAddProject)
    }

    return (
        <div className="">
           <div className="flex justify-between px-2 py-2">
                <h3 className="font-bold text-xl">
                    Projects
                </h3>
                {
                    isOwnedProfile && 
                    <button onClick={toggleEditMode}>
                        <PlusIcon className="block h-8 w-8"/>
                    </button>
                }
            </div>
            <SlideUpWindow isShowing={showAddProject} setIsShowing={setShowAddProject}>
                <NewProjectForm />
            </SlideUpWindow>
            {
                !projects
                ? <LoadingSpinner />
                : <div>
                    {projects.map(project => {
                        return(
                            <div key={project.project_name} className="py-1">
                                <div onClick={() => selectProject(project.project_id)} className="flex flex-row px-2">
                                    <div className="w-1/6">IMG</div>
                                    <div className="w-full">
                                        <h4 className="font-bold">{project.project_name}</h4>
                                        <p className="font-light border-b-2 text-sm pb-1">{project.project_description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            <SlideUpWindow isShowing={showProjectDetail} setIsShowing={setShowProjectDetail}>
                <ProjectDetail projectId={targetProject} close={() => setShowProjectDetail(false)}/>
            </SlideUpWindow>
        </div>
    )
}

export default ProfileProjects
