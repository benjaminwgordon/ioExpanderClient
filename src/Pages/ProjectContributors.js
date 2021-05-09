import React, {useState, useContext, useEffect} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import LoadingSpinner from '../Components/LoadingSpinner'
import {Link} from 'react-router-dom'

const ProjectContributors = (props) => {

    const {projectId} = props
    const token = useContext(authenticationContext).user.token
    const [contributors, setContributors] = useState(null)

    useEffect(() => {
        const fetchContributors = async () => {
            const result = await query.get(`/contributors/?project_id=${projectId}`, token)
            console.log({result})
            if (result.error){
                console.error(result.error)
                setContributors(null)
                return
            }
            setContributors(result)
        }
        fetchContributors()
    }, [projectId, token])

    return (
            contributors && contributors.length > 0 &&
            <div className="py-2">
                <h4 className="text-xl font-bold">
                    Contributors
                </h4>
                {
                    contributors.map(contributor => {
                        return(
                            <Link to={`/users/${contributor.user_id}`} key={contributor.user_id}>
                                <p className="p-2">{contributor.username}</p>
                            </Link>
                        )
                    })
                }
            </div>
    )
}

export default ProjectContributors
