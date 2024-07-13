import { useContext } from 'react'
import { Context } from '../Context/Context'
import "./ThemeSelector.css"

export function ThemeSelector() {
    const { setTheme } = useContext(Context)

    function handleChangeTheme(theme) {
        setTheme(theme)
    }


    return (
        <div className="w-full gap-2.5 flex flex-col lg:flex-row lg:gap-6">
            <button
                style={{ width: '1.6em' }}
                onClick={() => handleChangeTheme('dark')}
            >
                <div>
                    <img
                        src={"/full-moon.png"} alt="" />
                </div>

            </button>

            <button
                onClick={() => handleChangeTheme('light')}
            >
                <div className='w-full'>
                    <div className="container-sun">
                        <div className="cloud front">
                            <span className="left-front"></span>
                            <span className="right-front"></span>
                        </div>
                        <span className="sun sunshine"></span>
                        <span className="sun"></span>

                    </div>
                </div>
            </button>

            <button
                style={{ width: '1.6em' }}
                onClick={() => handleChangeTheme('colours')}>
                <div>
                    <img
                        src={"/colour.png"} alt="" />
                </div>
            </button>

        </div>
    )
}
