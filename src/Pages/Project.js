import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import {useParams, useLocation} from 'react-router-dom'
import query from '../query'
import Page from '../Components/Page'
import {Link} from 'react-router-dom'
import ContributorList from './ContributorList'
import { PencilIcon } from '@heroicons/react/outline'

const Project = (props) => {
    
    const context = useContext(authenticationContext)
    const {user_id, token} = context.user
    const [projectData, setProjectData] = useState(null)
    const [isOwnedProject, setIsOwnedProject] = useState(false) //used to control visibility of edit controls
    const {project_id} = useParams()

    useEffect(()=>{
        const fetchData = async () => {
            const res = await query.get(`/projects/${project_id}`, token)
            if (res.error){
                console.error(res.error)
                setProjectData(null)
                setIsOwnedProject(false)  
                return
            }
            setProjectData(res.project)
            setIsOwnedProject(res.project.project_owner_id === user_id)
        }
        fetchData()
    }, [token, project_id, user_id])

    return(
        projectData &&
        <Page>
            <div className="flex flex-col">
                <div className="py-4 px-4 flex flex-row justify-center items-center">
                    <h2 className="font-extrabold text-3xl">{projectData.project_name}</h2>
                    {
                        isOwnedProject && 
                        <PencilIcon className="mx-2 w-6 h-6"/>
                    }
                </div>
                <div className="py-2 px-4 flex flex-col ">
                    <h3 className="font-bold text-xl">Founder: </h3>
                    <Link className="pl-6" to={`/users/${projectData.project_owner_id}`}>{projectData.project_owner_username}</Link> 
                </div>
                <div className="py-2 px-4 flex flex-col ">
                    {
                        project_id && token &&
                        <ContributorList project_id={project_id} token={token} />
                    }
                </div>
                <div className="py-2 px-4 flex flex-row ">
                    <h3 className="font-bold text-xl">Founded: </h3>
                    <p className="pl-4 text-xl">{new Date(projectData.project_created_on).toLocaleDateString()}</p> 
                </div>
                {
                    projectData.project_description_long && 
                    <div className="py-2 px-4 flex flex-row ">
                        <h3 className="font-bold text-xl">About: </h3>
                        <p className="pl-4">{projectData.project_description_long}</p> 
                    </div>
                }
            </div>
        </Page>
    )
}

export default Project
