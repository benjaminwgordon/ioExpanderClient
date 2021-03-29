import React from 'react'

const authenticationContext = React.createContext({
    user: null,
    updateUser:()=>{}
})

export default authenticationContext