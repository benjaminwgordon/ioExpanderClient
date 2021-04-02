import React, {useState, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'

const NewProjectForm = (props) => {

    const {onSuccess, onFailure} = props

    const token = useContext(AuthorizationContext).user.token
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")


    const submitNewProject = async (e) => {
        e.preventDefault()
        const res = await query.post('/projects', {
            project_name:projectName, 
            project_description:projectDescription
        }, token)
        if (res.insertedProject){ 
            return onSuccess(res.insertedProject)
        }
        return onFailure()
    }


    return (
        <form>
            Project Name: <input type="text" name="project_name" value={projectName} onChange={(e)=> setProjectName(e.target.value)} /><br/>
            Project Description: <input type="text" name="project_description" value={projectDescription} onChange={(e)=> setProjectDescription(e.target.value)} /><br/>
            <button onClick={submitNewProject}>Submit</button>
        </form>
    )
}

export default NewProjectForm
