import React from 'react'

const EmailVerification = () => {
    
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const queryParams = useQuery()
    const verificationCode = queryParams.get("code") || null

    useEffect(()=>{
        if (verificationCode){
            quer
        }
    }, [verificationCode])

    return (
        <div>
            email verification
        </div>
    )
}

export default EmailVerification
