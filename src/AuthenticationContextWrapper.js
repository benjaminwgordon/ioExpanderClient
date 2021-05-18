import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import authenticationContext from './authenticationContext'

const AuthenticationContextWrapper = (props) => {

    const history = useHistory()

    const [user, setUser] = useState({
        username:null,
        user_id:null,
        token:null
    })

    return (
        <authenticationContext.Provider value={{
            user:user, 
            updateUser:(username, user_id, token)=>{
                setUser({username, user_id, token})
                history.push(`/users/${user_id}`)
            }}}>
            {props.children}
        </authenticationContext.Provider>
    )
}

export default AuthenticationContextWrapper