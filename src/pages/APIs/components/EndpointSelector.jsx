/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export function EndpointSelector({ url, title }) {
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        fetch(url)
            .then(response => {
                console.log(response.status, 'Ping-pong', url)
                setLoader(false)
            })
    }, [url])

    return (
        <div className="flex">
            <div className={`
            ${loader ? 'w-3/4' : 'w-full'}
            flex
            bg-emerald-950 rounded-lg p-2 
            text-center
            cursor-pointer
            drop-shad-tecno
            hover:bg-emerald-800
            transition-all duration-500
        `}>
                <h1
                    className=""
                >{title}</h1>

            </div>
            <div className="
            flex
            ">
                {loader && (
                    <div className="
                    flex 
                    items-center 
                    transition-all duration-300">
                        <div className="chaotic-orbit"></div>
                        <p className="text-sm">Loading...</p>
                    </div>
                )}

            </div>

        </div>
    )
}
