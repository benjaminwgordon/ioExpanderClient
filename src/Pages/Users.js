import React, {useState, useEffect, useContext, useRef} from 'react'
import authenticationContext from '../authenticationContext'
import query from '../query'

import Page from '../Components/Page'
import LoadingSpinner from '../Components/LoadingSpinner'
import {TemplateIcon} from '@heroicons/react/outline'
import SlideUpWindow from '../Components/SlideUpWindow'
import UserDetail from '../Components/UserDetail'



const Users = () => {

    const token = useContext(authenticationContext).user.token
    const [users, setUsers] = useState(null)
    const [showUserDetail, setShowUserDetail] = useState(true)
    const [targetUser, setTargetUser] = useState(null)
    const ref = useRef(null)

    const selectUser = (user_id) => {
        setTargetUser(user_id)
        setShowUserDetail(true)
    }

    useEffect(()=>{
        const fetchUsers = async() => {
            // fetch all users
            const users = await query.get('/users', token)
            if (users.error){
                return(null)
            }
            setUsers(users)
        }
        fetchUsers()
    }, [token])

    useEffect(()=>{
        if (users && users[0]){
            setTargetUser(users[0].user_id)
            if (ref.current.clientWidth > 1040){
                setShowUserDetail(true)
            }
        }
    }, [users])

    return (
        <Page>
            <div ref={ref}>
                <div className="flex justify-between px-2 py-2 border-b border-gray-400 w-full">
                        <h3 className="font-bold text-xl ">
                            Users
                        </h3>
                    </div>
                    <div className="flex flex-row">
                        {
                            !users
                            ? <LoadingSpinner />
                            : <div className="w-full lg:w-1/3 overflow-y-scroll">
                                {users.map(user => {
                                    const isActiveUser = (user.user_id === targetUser)
                                    console.log({isActiveUser})
                                    return(
                                        <div key={user.username} className="py-1">
                                            <div onClick={() => selectUser(user.user_id)} className={`py-1 flex flex-row ${isActiveUser && "bg-blue-100"}`}>
                                                <div className="w-1/6 text-center px-4 mb-auto">
                                                    <TemplateIcon className="w-8 h-8"/>
                                                </div>
                                                <div className="w-full">
                                                    <h4 className="h-full text-lg font-bold border-b-2 text-sm pb-2 pr-2">{user.username}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {
                            targetUser &&
                            <div className="lg:w-2/3 overflow-y-scroll">
                                <SlideUpWindow isShowing={showUserDetail} setIsShowing={setShowUserDetail}>
                                    <UserDetail userId={targetUser} close={() => setShowUserDetail(false)}/>
                                </SlideUpWindow>
                            </div>
                        }
                        
                    </div>
                </div>
        </Page>
    )
}

export default Users
