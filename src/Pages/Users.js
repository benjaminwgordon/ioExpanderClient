import React, {useState, useEffect, useContext} from 'react'
import authenticationContext from '../authenticationContext'
import {useParams} from 'react-router-dom'
import query from '../query'

import Page from '../Components/Page'
import LoadingSpinner from '../Components/LoadingSpinner'
import {TemplateIcon} from '@heroicons/react/outline'
import SlideUpWindow from '../Components/SlideUpWindow'
import UserDetail from '../Components/UserDetail'



const Users = () => {

    const token = useContext(authenticationContext).user.token
    const [users, setUsers] = useState(null)
    const params = useParams()
    const [error, setError] = useState(null)
    const [showUserDetail, setShowUserDetail] = useState(true)
    const [targetUser, setTargetUser] = useState(null)

    useEffect(()=>{
        console.log({params})
    }, [])



    const selectUser = (user_id) => {
        setTargetUser(user_id)
        setShowUserDetail(true)
    }



    const fetchSingleUser = async () => {
        // fetch specific user profile for id

    }

    useEffect(()=>{
        const fetchUsers = async() => {
            // fetch all users
            const users = await query.get('/users', token)
            if (users.error){
                setError(users.error)
                return(null)
            }
            setUsers(users)
        }
        fetchUsers()
    }, [token])

    return (
        <Page>
            <div>
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
                                    console.log(user)
                                    return(
                                        <div key={user.username} className="py-1">
                                            <div onClick={() => selectUser(user.user_id)} className="flex flex-row">
                                                <div className="w-1/6 text-center px-4 mt-auto mb-auto">
                                                    <TemplateIcon className="w-8 h-8"/>
                                                </div>
                                                <div className="w-full">
                                                    <h4 className="font-bold">{user.username}</h4>
                                                    {/* <p className="font-light border-b-2 text-sm pb-1 pr-2">{user.tagline}</p> */}
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
