import React from 'react'
import { Link } from 'react-router-dom'

const Project = (props) => {

    const {project_name, project_description, project_id} = props

    return (
        <Link to={`/projects/${project_id}`}>
            <h5>{project_name}</h5>
            <p>{project_description}</p>
        </Link>
    )
}

export default Project
