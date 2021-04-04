import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import authenticationContext from '../authenticationContext'

const Navbar = () => {

    const {user, updateUser} = useContext(authenticationContext)
    const logout = () => {
        updateUser({
            username:null,
            user_id:null,
            token:null}
        )
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>

                    {user.token && 
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
