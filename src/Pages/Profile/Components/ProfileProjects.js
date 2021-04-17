import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import NewProjectForm from '../../../Components/NewProjectForm'
import query from '../../../query'
import { PencilIcon } from '@heroicons/react/outline'
import ProjectDetail from '../../ProjectDetail'

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
        <div>
           <div className="flex justify-between">
                <h3 className="font-extrabold text-xl">
                    Projects
                </h3>
                {
                    props.isOwnedProfile && 
                    <button onClick={toggleEditMode}>
                        <PencilIcon className="block h-6 w-6"/>
                    </button>
                }
            </div>
            {
                showAddProject && <NewProjectForm />
            }
            {
                projects
                && projects.map(project => {
                    return(
                        <div key={project.project_name} className="px-3">
                            <h4 onClick={() => selectProject(project.project_id)}>{project.project_name}</h4>
                        </div>
                    )
                })
            }
            {
                showProjectDetail &&
                <div className="absolute top-0 left-0 w-full min-h-screen">
                    <ProjectDetail projectId={targetProject} close={() => setShowProjectDetail(false)}/>
                </div>

            }
        </div>
    )
}

export default ProfileProjects
