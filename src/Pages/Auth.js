import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'

const Auth = () => {

    const [isToggledToRegister, setIsToggledToRegister] = useState(true)

    const toggleLoginRegister = () => {
        setIsToggledToRegister(!isToggledToRegister)
    }

    return (
            isToggledToRegister ? 
            <Login toggleLoginRegister={toggleLoginRegister}/> : 
            <Register toggleLoginRegister={toggleLoginRegister}/>
    )
}

export default Auth
