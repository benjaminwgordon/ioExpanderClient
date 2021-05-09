import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import Page from '../Components/Page'

const ContributorInvitation = (props) => {

    const context = useContext(authenticationContext)
    const token = context.user.token
    const user_id = context.user.user_id
    const [targetUser, setTargetUser] = useState(null)
    const [targetProject, setTargetProject] = useState(null)

    useEffect(()=>{
        // Handle optional presets for user id and project id
        if (props.targetUser){
            setTargetUser(props.targetUser)
        }
        if (props.targetProject){
            setTargetProject(props.targetProject)
        }
    }, [])

    useEffect(()=>{
        const fetchOwnedProjects = async () => {
            const res = await query.get(`/projects?user_id=${user_id}`, token)
        }        
    },[targetUser, targetProject])




    return (
        <Page>
            contrib invitation
        </Page>
    )
}

export default ContributorInvitation
