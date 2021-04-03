import React, {useEffect, useContext, useState} from 'react'
import query from '../query'
import authorizationContext from '../authenticationContext'
import {Link} from 'react-router-dom'

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
    },[])

    return (
            !projectData ? 
            <p>Loading...</p> : 
            <div>
                <p>{projectData.project_name}</p>
                <p>{projectData.project_description}</p>
                Owner: <Link to={`/users/${projectData.project_owner_id}`}><span>{projectData.project_owner_username}</span></Link>
            </div>
    )
}

export default ProjectDetail
