import React from 'react'

const Button = (props) => {

    const {onClick} = props

    return (
        <button 
            onClick={onClick}
            className="appearance-none bg-green-400 text-white rounded-md py-1 px-2 hover:bg-green-500 focus:ring-white-100"
        >
            {props.children}
        </button>
    )
}

export default Button
