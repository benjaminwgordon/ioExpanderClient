import React, {useState, useEffect, useContext} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import authenticationContext from '../authenticationContext';
import Page from './Page';

const EmailVerification = () => {
    
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const user = useContext(authenticationContext).user
    const {user_id, token} = user
    const queryParams = useQuery()
    const verificationCode = queryParams.get("code")
    const email = queryParams.get("email")
    const [error, setError] = useState("")
    const history = useHistory()

    useEffect(()=>{
        if (user_id){
            history.push(`/users/${user_id}`)
        }
    }, [user_id])

    const postVerification = async (email, verificationCode) =>{
        if (!verificationCode || !email){
            setError("Missing Form Fields")
            return
        }
        const res = await fetch(
            process.env.REACT_APP_IOEXPANDER_API_URL + `/auth/emailVerification`,
            {
                method:"POST",
                body: JSON.stringify({email, verificationCode}),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log({status:res.status})
        if (res.status !== 200){
            setError("failed to authenticate")
            return
        } else{
            history.push('/login')
        }
    }

    useEffect(()=>{
        postVerification(email, verificationCode)
    }, [])

    const handleEmailVerificationSubmit = async (e) => {
        e.preventDefault()

    }

    return (
        <Page>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                {
                    !error 
                    ?<p>Please wait a moment while we process your email verification</p>
                    :<div className="flex flex-col justify-center items-center">
                        <p>Your verification email timed out or is invalid</p>
                        <button className="m-1 p-1 bg-green-400 text-white rounded-md" onClick={()=>history.push('/register')}>
                            Click here to submit registration again
                        </button>
                    </div>
                }
            </div>
        </Page>
    )
}

export default EmailVerification
