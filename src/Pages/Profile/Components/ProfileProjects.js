import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import NewProjectForm from '../../../Components/NewProjectForm'
import query from '../../../query'

const ProfileProjects = (props) => {

    const token = useContext(authenticationContext).user.token

    const {targetUserId, isOwnedProfile} = props
    const [projects, setProjects] = useState(null)
    const [showAddProject, setShowAddProject] = useState(false)

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await query.get(`/users/${targetUserId}/projects`, token)
            setProjects(res.usersProjects) 
        }
        fetchProjects()
    }, [targetUserId, token])

    return (
        <div>
            <h3>Projects</h3>
            {
                isOwnedProfile &&
                <button onClick={() => setShowAddProject(!showAddProject)}>Add Project</button>
            }
            {
                showAddProject && <NewProjectForm />
            }
            {
                projects
                && projects.map(project => {
                    return(
                        <div key={project.project_name}>
                            <h4>{project.project_name}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileProjects
