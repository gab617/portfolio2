/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

export function LoaderProject({ proyectUrl }) {
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        fetch(proyectUrl)
            .then(response => {
                console.log(response.status, 'Ping-pong', proyectUrl)
                setLoader(false)
            })
    }, [])

    return (
        <>
            {loader && (
                <>
                    <div className="mt-1">
                        <div className='flex'>
                            <div className="chaotic-orbit"></div>
                            <p className='text-xs mt-1'>Solicitando servidor</p>
                            <div className="chaotic-orbit"></div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
