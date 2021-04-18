import React, {useContext, useEffect, useState} from 'react'
import query from '../../query'
import authenticationContext from '../../authenticationContext'
import {useParams} from 'react-router-dom'

import ProfileSkills from './Components/ProfileSkills'
import ProfileProjects from './Components/ProfileProjects'
import ProfileSection from './Components/ProfileSection'
import Page from '../../Components/Page'
import LoadingSpinner from '../../Components/LoadingSpinner'

const Profile = () => {

    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    const [isOwnedProfile, setIsOwnedProfile] = useState(false)

    let targetUserId = useParams().id
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
                    setIsOwnedProfile(res.user.user_id === user_id)
                }else{
                    setTargetUserData(null)
                }
            }
        )
    }, [token, targetUserId, user_id])

    return (
        <Page>
            {
                !targetUserData
                ? <LoadingSpinner/>
                :<div className="min-h-screen w-full divide-y-2 relative">
                    <ProfileSection>
                        <ProfileSkills targetUserData={targetUserData} targetUserId={targetUserId} isOwnedProfile={isOwnedProfile} />
                    </ProfileSection>
                    <ProfileSection>
                        <ProfileProjects targetUserData={targetUserData} targetUserId={targetUserId} isOwnedProfile={isOwnedProfile} />
                    </ProfileSection>
                </div>
            }
        </Page>
    )
}

export default Profile
 