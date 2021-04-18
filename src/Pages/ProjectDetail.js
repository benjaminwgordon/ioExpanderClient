import React, {useEffect, useContext, useState} from 'react'
import query from '../query'
import authorizationContext from '../authenticationContext'
import {Link} from 'react-router-dom'
import { DotsHorizontalIcon, XIcon } from '@heroicons/react/outline'

const ProjectDetail = (props) => {

    const token = useContext(authorizationContext).user.token
    const {projectId, close} = props
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
            <p>Loading...</p> : 
            <div className="min-h-screen w-full bg-white shadow-md">
                <div className="px-4 py-6 bg-gray-50">
                    <h3 className="font-extrabold text-2xl">{projectData.project_name}</h3>
                    <p className="">{projectData.project_description}</p>
                    Owner: <Link to={`/users/${projectData.project_owner_id}`}><span>{projectData.project_owner_username}</span></Link>
                </div>
            </div>
    )
}

export default ProjectDetail
