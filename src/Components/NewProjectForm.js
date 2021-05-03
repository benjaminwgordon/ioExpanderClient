import React, {useState, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'

const NewProjectForm = (props) => {

    const {onSuccess, onFailure} = props

    const token = useContext(AuthorizationContext).user.token
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [error, setError] = useState("")

    const submitNewProject = async (e) => {
        e.preventDefault()
        const res = await query.post('/projects', {
            project_name:projectName, 
            project_description:projectDescription
        }, token)
        if (res.insertedProject){ 
            setError("")
            onSuccess(res.insertedProject)
        } else{
            switch(res.error){
                case 400:
                    setError("Missing or Invalid Info")
                    break
                case 409:
                    setError("A Project with this name already exists")
                    break
                default:
                    setError("Error in form")
                    break
            }

            //handles any request failure behavior that the parent component needs access to
            onFailure()
        }
        
    }


    return (
        <form className="px-6 py-6 flex flex-col">
            <input 
                type="text" 
                placeholder="Project Name" 
                name="project_name" value={projectName} 
                onChange={(e)=> setProjectName(e.target.value)} 
                className="py-1 my-1 border border-gray-300 rounded-md pl-2"
                maxLength="40"
            />
            <input 
                type="text" 
                placeholder="Project Description" 
                name="project_description" 
                value={projectDescription} 
                onChange={(e)=> setProjectDescription(e.target.value)} 
                className="py-1 my-1 border border-gray-300 rounded-md pl-2"
                maxLength="80"
            />
            <button 
                onClick={submitNewProject}
                className="py-1 my-1 bg-green-300"
            >

                    Submit
            </button>
            {
                error && <p className="text-red-600 text-center">{error}</p>
            }
        </form>
    )
}

export default NewProjectForm
