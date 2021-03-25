import React, {useState} from 'react'
import query from '../query'

const Login = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setPassword("")
        const res = await query("/auth/login", "POST", {username, email, password})
        
    }

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                Username: <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/><br/>
                Email: <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                Password: <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit">Submit</button><br/>
                <button action="swapToRegistration()">Don't have an account?</button>
            </form>
        </div>
    )
}



export default Login
