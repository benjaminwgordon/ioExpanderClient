import React, {useState, useContext} from 'react'
import query from '../query'
import authenticationContext from '../authenticationContext'

const Register = (props) => {

    const {toggleLoginRegister} = props

    const user = useContext(authenticationContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        setPassword("")
        const res = await query.post("/auth/register", {username, email, password})
        if (res.token){
            user.updateUser(username, res.user_id, res.token)
        }
    }


    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>
                Username: <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/><br/>
                Email: <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                Password: <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit">Submit</button><br/>
            </form>
            <button onClick={toggleLoginRegister}>Already have an account?</button>
        </div>
    )
}

export default Register
