import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import Page from '../Components/Page'
import {useHistory, useLocation} from 'react-router-dom'
import { PlusCircleIcon, UserCircleIcon } from '@heroicons/react/outline'

const ContributorInvitation = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    const context = useContext(authenticationContext)
    const token = context.user.token
    const user_id = context.user.user_id
    const queryParams = useQuery()
    const history = useHistory()
    const [ownedProjects, setOwnedProjects] = useState(null)
    const [targetUser, setTargetUser] = useState(null)
    const [targetProject, setTargetProject] = useState(null)

    useEffect(()=>{
        // Handle optional presets for user id and project id
        console.log({queryParams})
        if (queryParams.get("user_id")){
            setTargetUser(queryParams.get("user_id"))
            return
        }
        setTargetUser(null)
    }, [])

    useEffect(()=>{
        const fetchOwnedProjects = async () => {
            const res = await query.get(`/projects?user_id=${user_id}`, token)
            if (res.error){
                setOwnedProjects(null)
                return
            }
            setOwnedProjects(res)
        }        
        fetchOwnedProjects()
        const fetchExistingContributorRequests = async () => {
            const res = await query.get(`/contributor_requests?issuer_id=${user_id}`)
        }
    },[targetUser, targetProject])

    const handleInviteSubmit = async (e, project_id) => {
        e.preventDefault()
        const res = query.post(`/contributor_requests`, {project_id:project_id, user_id:targetUser}, token)
        if (res.error){
            return
        }
        history.push(`/projects/${project_id}`)
    }

    return (
        <Page>
            <div className="p-2">
                <form className="flex flex-col items-center">
                    {
                        ownedProjects && 
                        ownedProjects.map(project => {
                            return(
                                <div className="">
                                    <h4>{project.project_name}</h4>
                                    <button onClick={(e)=> handleInviteSubmit(e, project.project_id)}>
                                        <PlusCircleIcon className="w-8 h-8"/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </form>
            </div>
        </Page>
    )
}

export default ContributorInvitation
