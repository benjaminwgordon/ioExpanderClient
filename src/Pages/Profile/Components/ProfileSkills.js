import { PencilIcon } from '@heroicons/react/outline'
import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import query from '../../../query'
import ProfileSkillsDetails from './ProfileSkillsDetails'
import ProfileSkillsEdit from './ProfileSkillsEdit'

const ProfileSkills = (props) => {

    const token = useContext(authenticationContext).user.token

    const {targetUserId} = props
    const [skills, setSkills] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await query.get(`/users/${targetUserId}/skills`, token)
            setSkills(res.usersSkills) 
        }
        fetchSkills()
    }, [targetUserId, token])

    

    return (
        <div className="px-2 py-2">
            <div className="flex justify-between">
                <h3 className="font-extrabold text-xl">Skills</h3>
                {
                    props.isOwnedProfile && 
                    <button onClick={toggleEditMode}>
                        <PencilIcon className="block h-6 w-6"/>
                    </button>
                }
            </div>
            <div>
                {
                    isEditMode 
                    ? <ProfileSkillsEdit skills={skills} setSkills={setSkills} targetUserId={targetUserId} toggleEditMode={()=>setIsEditMode(false)}/>
                    : <ProfileSkillsDetails skills={skills}  targetUserId={targetUserId} />
                }
            </div>
        </div>
    )
}

export default ProfileSkills
