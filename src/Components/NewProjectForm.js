import React, {useState, useContext} from 'react'
import query from '../query'
import AuthorizationContext from '../authenticationContext'
import {useHistory} from 'react-router-dom'

const NewProjectForm = (props) => {

    const {onSuccess, onFailure, close} = props

    const token = useContext(AuthorizationContext).user.token
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()

    const submitNewProject = async (e) => {
        e.preventDefault()
        const res = await query.post('/projects', {
            project_name:projectName, 
            project_description:projectDescription
        }, token)
        if (res.insertedProject){ 
            setError("")
            if (onSuccess){
                onSuccess(res.insertedProject)
            }
            history.push(`/projects/${res.insertedProject.project_id}`)
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
            if (onFailure){onFailure()}
        }
        
    }


    return (
        <form className="px-6 py-6 flex flex-col lg:w-1/2 m-auto max-w-lg">
            <h3 className="hidden lg:block text-xl font-bold text-center">
                New Project
            </h3>
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
            <div className="flex flex-col sm:flex-row w-full justify-evenly">
                <button 
                    onClick={close}
                    className="py-1 m-1 bg-red-300 w-full rounded-md"
                >
                    Cancel
                </button>
                <button 
                    onClick={submitNewProject}
                    className="py-1 m-1 bg-green-300 w-full rounded-md"
                >
                    Submit
                </button>

            </div>
            {
                error && <p className="text-red-600 text-center">{error}</p>
            }
        </form>
    )
}

export default NewProjectForm
