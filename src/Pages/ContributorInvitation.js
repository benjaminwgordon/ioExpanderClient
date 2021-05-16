import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import Page from '../Components/Page'
import {useHistory, useLocation} from 'react-router-dom'
import { DotsCircleHorizontalIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/outline'

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
    const [existingContributorRequests, setExistingContributorRequests] = useState(null)

    //this is an antipattern, will address later
    const [forceUpdate, setForceUpdate] = useState(0)

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
            const res = await query.get(`/contributor_requests?issuer_id=${user_id}`, token)
            if (res.error){
                console.error(res.error)
                return
            }
            setExistingContributorRequests(res)
        } 
        fetchExistingContributorRequests()
    },[targetUser, targetProject, forceUpdate])

    const handleInviteSubmit = async (e, project_id) => {
        e.preventDefault()
        const res = query.post(`/contributor_requests`, {project_id:project_id, user_id:targetUser}, token)
        if (res.error){
            return
        }
        setForceUpdate(forceUpdate + 1)
    }

    return (
        <Page>
            <div className="p-2 w-full">
                <h2 className="text-xl font-bold">Your Projects</h2>
                <form className="flex flex-col">
                    {
                        ownedProjects && existingContributorRequests &&
                        ownedProjects.map(project => {

                            const hasExistingInvitation = existingContributorRequests.some(request => {
                                return request.project_id === project.project_id
                            })
                            console.log({hasExistingInvitation})

                            return(
                                <div className="p-4 flex flex-row w-full justify-between">
                                    <div>
                                        <h4 className="font-bold">{project.project_name}</h4>
                                        <p className="px-4 font-light ">{project.project_description}</p>
                                    </div>
                                    {
                                        hasExistingInvitation 
                                        ?<div>Already Invited</div>
                                        :<button onClick={(e)=> handleInviteSubmit(e, project.project_id)} className="p-2 rounded-md bg-green-400 hover:bg-green-500 text-white">
                                            Invite
                                        </button>
                                    }
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
