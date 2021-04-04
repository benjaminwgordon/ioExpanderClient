import React, {useState, useContext} from 'react'
import query from '../query'
import authenticationContext from '../authenticationContext'
const Login = (props) => {

    const {toggleLoginRegister} = props

    const user = useContext(authenticationContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setPassword("")
        const res = await query.post("/auth/login", {email, password})
        if (res.token){
            user.updateUser(res.username, res.user_id, res.token)
        }
    }

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                Email: <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                Password: <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit">Submit</button><br/>
            </form>
            <button onClick={toggleLoginRegister}>Don't have an account?</button>
        </div>
    )
}



export default Login
