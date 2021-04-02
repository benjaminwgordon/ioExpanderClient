import React, {useState, useContext} from 'react'
import query from '../query'
import authenticationContext from '../authenticationContext'

const Register = () => {

    const user = useContext(authenticationContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setPassword("")
        const res = await query.post("/auth/login", {username, email, password})
        if (res.token){
            user.updateUser(username, res.user_id, res.token)
        }
    }


    return (
        <div>
            
        </div>
    )
}

export default Register
