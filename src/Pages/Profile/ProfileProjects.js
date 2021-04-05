import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../authenticationContext'
import query from '../../query'

const ProfileProjects = (props) => {

    const token = useContext(authenticationContext).user.token

    const {targetUserId} = props
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await query.get(`/users/${targetUserId}/projects`, token)
            setProjects(res.usersProjects) 
        }
        fetchProjects()
    }, [targetUserId, token])

    return (
        <div>
            {
                projects
                && projects.map(project => {
                    return(
                        <div>
                            <h4>{project.project_name}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileProjects
