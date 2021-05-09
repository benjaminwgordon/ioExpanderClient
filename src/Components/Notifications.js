import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'

import query from '../query'
import LoadingSpinner from './LoadingSpinner'
import SlideUpWindow from './SlideUpWindow'

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
            setNotifications(res.contributor_requests)
        }
        fetchNotifications()
    }, [token])

    const handleNotificationDecline = async (contributor_request_id) => {
        const res = await query.put(`/contributor_requests/${contributor_request_id}`, {accept: false}, token)
        if(res.error){
            console.error(res.error)
            return
        }
        const updatedNotif = notifications.filter(notification => notification.contributor_request_id !== contributor_request_id)
        console.log(updatedNotif)
        setNotifications(updatedNotif)
    }

    const handleNotificationAccept = async (contributor_request_id) => {
        const res = await query.put(`/contributor_requests/${contributor_request_id}`, {accept: true}, token)
        if(res.error){
            console.error(res.error)
            return
        }
        setNotifications(notifications.filter(notification => notification.contributor_request_id !== contributor_request_id))
    }


    return (
        <div>
            {/* <SlideUpWindow showing={} setIsShowing={} windowTitle="Notifications"> */}
                <div className="w-screen flex justify-end">
                    <div className="mt-6 w-3/4 lg:w-1/4 flex flex-col bg-gray-100 items-start border-r border-l border-b border-gray-400 rounded-b-sm">
                        {
                            notifications === null
                            ? <LoadingSpinner />
                            : (
                                notifications.length > 0
                                ? notifications.map(notification => {
                                const issueDate = new Date(notification.contributor_request_issue_date).toLocaleDateString()
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
                                )})
                                : <div>
                                    <p>No Nofitications Found</p>
                                </div>  
                            )                       
                        }
                    </div>
                </div>
            {/* </SlideUpWindow> */}
        </div>
    )
}

export default Notifications
