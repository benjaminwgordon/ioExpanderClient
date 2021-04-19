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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p
                        onClick={toggleLoginRegister}
                        className="font-medium text-center text-indigo-600 hover:text-indigo-500">
                            Don't have an account?
                    </p>
                </div>
                <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email: 
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="email address"
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
                            />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Email: 
                                </label>
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="password"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"    
                                />
                            </div>
                        </div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}



export default Login
