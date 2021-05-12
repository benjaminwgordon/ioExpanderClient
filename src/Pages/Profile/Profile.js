import React, {useContext, useEffect, useState} from 'react'
import query from '../../query'
import authenticationContext from '../../authenticationContext'
import {useParams, Link} from 'react-router-dom'

import ProfileSkills from './Components/ProfileSkills'
import ProfileProjects from './Components/ProfileProjects'
import ProfileSection from './Components/ProfileSection'
import Page from '../../Components/Page'
import LoadingSpinner from '../../Components/LoadingSpinner'
import { PlusCircleIcon, UserCircleIcon } from '@heroicons/react/outline'
import SlideUpWindow from '../../Components/SlideUpWindow'

const Profile = () => {

    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    const [isOwnedProfile, setIsOwnedProfile] = useState(false)
    const [showUserActionsMenu, setShowUserActionsMenu] = useState(false)

    let targetUserId = useParams().user_id
    if (!targetUserId){
        targetUserId = user_id
    }
    const [targetUserData, setTargetUserData] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            const res = await query.get(`/users/${targetUserId}`, token)
            if (res.error){
                console.error(res.error)
                setTargetUserData(null)
                setIsOwnedProfile(false)   
            }
            setTargetUserData(res)
            setIsOwnedProfile(res.user_id === user_id)
        }
        fetchData()
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
                        <div className="flex flex-row items-center">
                            <UserCircleIcon className="w-24 h-24"/>
                            <h1 className="font-bold text-3xl p-2">{targetUserData.username.charAt(0).toUpperCase() + targetUserData.username.slice(1)}</h1>
                        </div>
                        <div className="">
                            <div className="right-0 top-2 flex flex-col md:flex-row-reverse items-end ">
                                {
                                    !isOwnedProfile &&
                                    <button className="" onClick={toggleUserActionsMenu}>
                                        <PlusCircleIcon className="w-8 h-8 text-green-400"/>
                                    </button>
                                    }
                                {
                                    showUserActionsMenu &&
                                    <>
                                        <Link to={`/contributor_invitation?user_id=${targetUserData.user_id}`} className="m-auto p-1 bg-green-300 hover:bg-green-400 text-white rounded-md">
                                            Invite to Contribute
                                        </Link>
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
 