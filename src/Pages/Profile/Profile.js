import React, {useContext, useEffect, useState} from 'react'
import query from '../../query'
import authenticationContext from '../../authenticationContext'
import {useParams} from 'react-router-dom'

import ProfileSkills from './Components/ProfileSkills'
import ProfileProjects from './Components/ProfileProjects'
import ProfileSection from './Components/ProfileSection'
import Page from '../../Components/Page'
import LoadingSpinner from '../../Components/LoadingSpinner'
import { PlusCircleIcon } from '@heroicons/react/outline'
import SlideUpWindow from '../../Components/SlideUpWindow'

const Profile = () => {

    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    const [isOwnedProfile, setIsOwnedProfile] = useState(false)
    const [showUserActionsMenu, setShowUserActionsMenu] = useState(false)

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

    const toggleUserActionsMenu = () => {
        setShowUserActionsMenu(!showUserActionsMenu)
    }
    
    return (
        <Page>
            {
                !targetUserData
                ? <LoadingSpinner/>
                :<div className="min-h-screen w-full divide-y-8">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="font-bold text-3xl p-2">{targetUserData.username.charAt(0).toUpperCase() + targetUserData.username.slice(1)}</h1>
                        <div className="">
                            <div className="right-0 top-2 flex flex-col md:flex-row-reverse items-end ">
                                <button className="" onClick={toggleUserActionsMenu}>
                                    <PlusCircleIcon className="w-8 h-8 text-green-400"/>
                                </button>
                                {
                                    showUserActionsMenu &&
                                    <>
                                        <button onClick={()=>{}} className="m-1 p-2 text-sm bg-green-400 text-white rounded-md">
                                            Invite to Contribute
                                        </button>
                                        <button onClick={()=>{}} className="m-1 p-2 text-sm bg-green-400 text-white rounded-md">
                                            Add Connection
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
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
 