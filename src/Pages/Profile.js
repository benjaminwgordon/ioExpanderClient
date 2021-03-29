import React, {useContext, useEffect, useState} from 'react'
import {get} from '../query'
import authenticationContext from '../authenticationContext'
const Profile = (props) => {

    const signedInUser = useContext(authenticationContext)
    const {targetUserUsername} = props

    const [targetUser, setTargetUser] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            return await get(`/users/${targetUserUsername}`, signedInUser.user.token)
        }
        fetchData()
            .then(res=>{
                if (res){
                    setTargetUser(res.user)
                }else{
                    setTargetUser(null)
                }
            }
        )
    }, [signedInUser, targetUserUsername])

    return (
        <div>
            {targetUser ? 
                <h4>{targetUser.username}'s Profile</h4>
            :
                <p>no user found</p>
            }
        </div>
    )
}

export default Profile
