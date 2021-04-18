import { Transition } from '@headlessui/react'
import React, {useState} from 'react'
import { XIcon, DotsHorizontalIcon } from '@heroicons/react/outline'


const SlideUpWindow = (props) => {

    const {isShowing, setIsShowing} = props

    return (
            <Transition
                show={isShowing}
                enter="transition duration-500 lg:transition-none"
                enterFrom="transform translate-y-full"
                enterTo="transform translate-y-0"
                leave="transition duration-500 lg:transition-none"
                leaveFrom="transform translate-y-0"
                leaveTo="transform  translate-y-full"
                className="absolute top-0 left-0 min-h-screen w-full lg:relative bg-white"
            >
                <div className="bg-white">                    
                    <div className="px-6 py-2 border-b flex justify-between lg:py-0 lg:hidden">
                        <button onClick={() => setIsShowing(false)} >
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </Transition>
    )
}

export default SlideUpWindow
