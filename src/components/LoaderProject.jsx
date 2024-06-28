/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

export function LoaderProject({ url, text }) {
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        fetch(url)
            .then(response => {
                console.log(response.status, 'Ping-pong', url)
                setLoader(false)
            })
    }, [])

    return (
        <div  className={` ${loader ? ' items-center flex  opacity-100' : 'opacity-0 hidden'} transition-all duration-500`}>
            {loader && (
                <>
                    <div className='flex items-center'>
                        <div className="chaotic-orbit"></div>
                        <p className='text-xs'>{text}</p>
                        <div className="chaotic-orbit"></div>
                    </div>
                </>
            )}
        </div>
    )
}
