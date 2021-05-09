import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import Page from '../Components/Page'
import {useLocation} from 'react-router-dom'

const ContributorInvitation = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

    const context = useContext(authenticationContext)
    const token = context.user.token
    const user_id = context.user.user_id
    const queryParams = useQuery()
    const [targetUser, setTargetUser] = useState(null)
    const [targetProject, setTargetProject] = useState(null)

    useEffect(()=>{
        // Handle optional presets for user id and project id
        console.log({queryParams})
        if (queryParams.get("user_id")){
            setTargetUser(queryParams.get("user_id"))
        }
        if (queryParams.get("project_id")){
            setTargetProject(queryParams.get("project_id"))
        }
    }, [])

    useEffect(()=>{
        const fetchOwnedProjects = async () => {
            const res = await query.get(`/projects?user_id=${user_id}`, token)
            const ownedProjects = res
            console.log({ownedProjects})
        }        
        fetchOwnedProjects()
    },[targetUser, targetProject])




    return (
        <Page>
            contrib invitation
        </Page>
    )
}

export default ContributorInvitation
