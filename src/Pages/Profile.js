import React, {useContext, useEffect, useState} from 'react'
import query from '../query'
import authenticationContext from '../authenticationContext'
import {useParams} from 'react-router-dom'

const Profile = (props) => {

    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    console.log({token})
    let {targetUserId} = useParams()
    if (!targetUserId){
        targetUserId = user_id
    }
    const [targetUserData, setTargetUserData] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            return await query.get(`/users/${targetUserId}`, token)
        }
        fetchData()
            .then(res=>{
                if (res){
                    setTargetUserData(res.user)
                }else{
                    setTargetUserData(null)
                }
            }
        )
    }, [token, targetUserId])

    return (
        <div>
            {targetUserData ? 
                <h4>{targetUserData.username}'s Profile</h4>
            :
                <p>no user found</p>
            }
        </div>
    )
}

export default Profile
