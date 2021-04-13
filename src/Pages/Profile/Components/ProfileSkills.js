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
        <div>
            {
                props.isOwnedProfile && <button onClick={toggleEditMode}>Edit Skills</button>
            }
            {
                isEditMode 
                ? <ProfileSkillsEdit skills={skills} setSkills={setSkills} targetUserId={targetUserId}/>
                : <ProfileSkillsDetails skills={skills}  targetUserId={targetUserId} />
            }
            
        </div>
    )
}

export default ProfileSkills
