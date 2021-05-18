import React from 'react'

const Page = (props) => {
    return (
        <div className="min-h-screen w-full bg-gray-100 overflow-hidden">
            <div className="min-h-screen w-full max-w-screen-xl mx-auto relative bg-white">
                {props.children}
            </div>
        </div>
    )
}

export default Page
