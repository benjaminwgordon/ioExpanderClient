import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import authenticationContext from './authenticationContext'

const AuthenticationContextWrapper = (props) => {

    const history = useHistory()

    const [user, setUser] = useState({
        username:null,
        user_id:null,
        token:null
    })

    useEffect(() => {
        if (!user.token){
            console.log({user})
            history.push("/login")
        }
    }, [user, history])

    return (
        <authenticationContext.Provider value={{
            user:user, 
            updateUser:(username, user_id, token)=>{
                setUser({username, user_id, token})
                history.push("/home")
            }}}>
            {props.children}
        </authenticationContext.Provider>
    )
}

export default AuthenticationContextWrapper