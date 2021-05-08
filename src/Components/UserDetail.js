import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import ProfileSkillsDetails from '../Pages/Profile/Components/ProfileSkillsDetails'
import query from '../query'
import LoadingSpinner from './LoadingSpinner'

const UserDetail = (props) => {

    const token = useContext(authenticationContext).user.token
    const {userId} = props
    const [userData, setUserData] = useState(null)
    const [skillData, setSkillData] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            const result = await query.get(`/users/${userId}`, token)
            if (result.error){
                console.error(result.error)
                setUserData(null)
            }
            setUserData(result)
        }
        fetchUserData()

        const fetchSkillData = async () => {
            const result = await query.get(`/users/${userId}/skills`, token)
            if (result.error){
                console.error(result.error)
                setSkillData(null)
            }
            console.log(result)
            setSkillData(result.usersSkills)
        }
        fetchSkillData()
    }, [token])


    return (
        !userData 
        ? <LoadingSpinner/>
        : 
        <div className="p-1">
            <h4 className="p-1 text-2xl font-bold">{userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}</h4>
            <div className="p-1">
                <h4 className="p-2 text-lg font-bold">Skills</h4>
                <ProfileSkillsDetails skills={skillData}/>
            </div>
            {/* <div>
                {
                    skillData &&
                    skillData.map(skill => {
                        return(
                            <div className="">

                            </div>
                        )
                    })
                }
            </div> */}
        </div>
    )
}

export default UserDetail
