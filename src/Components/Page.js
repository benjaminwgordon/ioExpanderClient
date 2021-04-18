import React from 'react'

const Page = (props) => {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="min-h-screen w-full max-w-screen-xl mx-auto relative">
                <div className="pt-4 lg:py-10">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Page
