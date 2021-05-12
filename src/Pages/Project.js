import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import {useParams, useLocation} from 'react-router-dom'
import query from '../query'
import Page from '../Components/Page'
import {Link} from 'react-router-dom'

const Project = (props) => {
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const context = useContext(authenticationContext)
    const {user_id, token} = context.user
    const [projectData, setProjectData] = useState(null)
    const [isOwnedProject, setIsOwnedProject] = useState(false) //used to control visibility of edit controls
    const {project_id} = useParams()
    const [contributors, setContributors] = useState(null)

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
            setIsOwnedProject(res.user_id === user_id)
        }
        fetchData()

        const fetchContributors = async () => {
            const res = await query.get(`/contributors?project_id=${project_id}`, token)
            if (res.error){
                console.error(res.error)
                setContributors(null)
                return
            }
            setContributors(res)
        }
        fetchContributors()
    }, [token, project_id, user_id])

    return(
        projectData &&
        <Page>
            <div className="flex flex-col">
                <div className="py-2 px-4 ">
                    <h2 className="font-extrabold text-3xl text-center lg:text-left">{projectData.project_name}</h2>
                </div>
                <div className="py-2 px-4 flex flex-col ">
                    <h3 className="font-bold text-xl">Founder: </h3>
                    <Link className="pl-6" to={`/users/${projectData.project_owner_id}`}>{projectData.project_owner_username}</Link> 
                </div>
                <div className="py-2 px-4 flex flex-col ">
                    <h3 className="font-bold text-xl">Contributors: </h3>
                    <div className="flex flex-col">
                        {
                            contributors &&
                            contributors.map(contributor =>{
                                return(
                                    <Link className="pl-6" to={`/users/${contributor.user_id}`}>{contributor.username}</Link> 
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Project
