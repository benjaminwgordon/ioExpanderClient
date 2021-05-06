import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'

import query from '../query'

const Notifications = () => {

    const token = useContext(authenticationContext).user.token
    const [notifications, setNotifications] = useState(null)

    useEffect( () => {

        // query from each notification source, needs a refactor to make a backend endpoint that combines all notification sources

        // currently only queries contributor requests
        const fetchNotifications = async () =>{
            const res = await query.get('/contributor_requests', token)
            if (res.error){
                console.log(res.error)
                return
            } 
            console.log(res.contributor_requests)
            setNotifications(res.contributor_requests)
        }
        fetchNotifications()
    }, [token])

    const handleNotificationDecline = () => {

    }

    const handleNotificationAccept = () => {
        
    }


    return (
        <div>
            {
                notifications &&
                <div className="w-screen flex justify-end ">
                    <div className="w-3/4 lg:w-1/4 flex flex-col bg-gray-100 items-start">
                        {
                            notifications.map(notification => {
                                console.log({notification})
                                const issueDate = new Date(notification.contributor_request_issue_date).toLocaleDateString()

                                console.log(issueDate)
                                return(
                                    <div className="p-2 flex flex-row justify-between w-full">
                                        <div>
                                            <h4 className="">Invited as Contributor: {notification.project_name}</h4>
                                            <p className="text-xs font-light">{issueDate}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <button onClick={()=>{handleNotificationDecline(notification.contributor_request_id)}}>
                                                <XCircleIcon className="text-red-400 w-8 h-8" />
                                            </button>
                                            <button onClick={()=>{handleNotificationAccept(notification.contributor_request_id)}}>
                                                <CheckCircleIcon className="text-green-400 w-8 h-8" />
                                            </button>
                                        </div>
                                    </div>  
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Notifications
