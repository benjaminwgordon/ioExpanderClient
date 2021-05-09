import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import authenticationContext from '../authenticationContext'
import ProfileSkillsDetails from '../Pages/Profile/Components/ProfileSkillsDetails'
import query from '../query'
import LoadingSpinner from './LoadingSpinner'
import ProfileProjects from '../Pages/Profile/Components/ProfileProjects'
import { UserCircleIcon } from '@heroicons/react/outline'

const UserDetail = (props) => {

    const context = useContext(authenticationContext)
    const token = context.user.token
    const auth_user_id = context.user.user_id
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
            console.log(result)
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
    }, [token, userId])


    return (
        !userData 
        ? <LoadingSpinner/>
        : 
        <div className="p-1 flex flex-row">
            <div className="">
                <UserCircleIcon className="w-24 h-24" />
            </div>
            <div className="">
                <Link to={`/users/${userData.user_id}`}>
                    <h4 className="p-1 text-2xl font-bold">{userData.username.charAt(0).toUpperCase() + userData.username.slice(1)}</h4>
                </Link>
                <div className="pl-2">
                    {
                        skillData &&
                        <div>
                            <p>
                            {
                                skillData.sort((a,b)=> b.technology_rating - a.technology_rating).slice(0,5).map(skill => skill.technology_name).join(", ")
                            }
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDetail
