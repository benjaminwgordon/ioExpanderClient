import React from 'react'

const Project = (props) => {

    const {project_name, project_description, project_id, selectProject} = props

    return (
        <div onClick={()=>selectProject(project_id)}>
            <h5>{project_name}</h5>
            <p>{project_description}</p>
        </div>
    )
}

export default Project
