import React, {useEffect, useContext, useState} from 'react'
import query from '../query'
import authorizationContext from '../authenticationContext'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'
import ProjectContributors from './ProjectContributors'
import { UserCircleIcon } from '@heroicons/react/outline'

const ProjectDetail = (props) => {

    const token = useContext(authorizationContext).user.token
    const {projectId} = props
    const [projectData, setProjectData] = useState(null)

    useEffect(() => {
        const fetchProject = async () => {
            const res = await query.get(`/projects/${projectId}`, token)
            setProjectData(res.project)
        }
        fetchProject()
    },[projectId, token])

    return (
            !projectData ? 
            <LoadingSpinner /> : 
            <div className="min-h-screen w-full bg-white shadow-md">
                <div className="px-6 py-6 bg-gray-50 flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                        <div>
                            <UserCircleIcon className="w-16 h-16"/>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="pl-2 font-extrabold text-2xl">{projectData.project_name}</h3>
                            <p className="pl-4">{projectData.project_description}</p>
                        </div>
                    </div>
                    <div>
                        <Link to={`/projects/${projectData.project_id}`} className="p-2 rounded-md bg-green-300 hover:bg-green-400 text-white rounded-sm m-auto">
                            View Project
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default ProjectDetail
