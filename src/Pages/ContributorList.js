import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'
import {Link} from 'react-router-dom'
import {useParams, useLocation} from 'react-router-dom'

const ContributorList = (props) => {

    const {project_id, token} = props    
    const [contributors, setContributors] = useState(null)

    useEffect(()=>{
        const fetchContributors = async () => {
            const res = await query.get(`/contributors?project_id=${project_id}`, token)
            if (res.error){
                console.error(res.error)
                setContributors(null)
                return
            }
            setContributors(res)
        }
        fetchContributors()
    }, [project_id, token])

    return (
        <>
            <h3 className="font-bold text-xl">Contributors: </h3>
            <div className="flex flex-col">
                {
                    contributors &&
                    contributors.map(contributor =>{
                        return(
                            <Link className="pl-6" to={`/users/${contributor.user_id}`}>{contributor.username}</Link> 
                        )
                    })
                }
            </div>
        </>
    )
}

export default ContributorList
