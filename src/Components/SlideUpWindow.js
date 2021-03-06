import { Transition } from '@headlessui/react'
import React from 'react'
import { XIcon } from '@heroicons/react/outline'


const SlideUpWindow = (props) => {

    const {isShowing, setIsShowing, windowTitle} = props

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
                    <div className="px-4 py-2 border-b-2 shadow-md flex justify-between lg:py-0 lg:hidden">
                        <button onClick={() => setIsShowing(false)} >
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                        <h3 className="font-bold text-xl">{windowTitle}</h3>
                        <div></div>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </Transition>
    )
}

export default SlideUpWindow
