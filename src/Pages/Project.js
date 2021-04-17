import React from 'react'

const Project = (props) => {

    const {project_name, project_description, project_id, selectProject} = props

    return (
        <div onClick={()=>selectProject(project_id)} className="py-2 px-4">
            <h5 className="font-extrabold">{project_name}</h5>
            <p className="px-2">{project_description}</p>
        </div>
    )
}

export default Project
