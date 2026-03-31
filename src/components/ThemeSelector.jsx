import { useContext } from 'react'
import { Context } from '../Context/Context'
import "./ThemeSelector.css"

export function ThemeSelector() {
    const { setTheme } = useContext(Context)

    function handleChangeTheme(theme) {
        setTheme(theme)
    }

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={() => handleChangeTheme('dark')}
                className="w-6 h-6"
            >
                <img src="/full-moon.png" alt="dark" className="w-full h-full object-contain" />
            </button>

            <button
                onClick={() => handleChangeTheme('light')}
                className="w-6 h-6 relative"
            >
                <div className="container-sun">
                    <div className="cloud front">
                        <span className="left-front"></span>
                        <span className="right-front"></span>
                    </div>
                    <span className="sun sunshine"></span>
                    <span className="sun"></span>
                </div>
            </button>

            <button
                onClick={() => handleChangeTheme('colours')}
                className="w-6 h-6"
            >
                <img src="/colour.png" alt="colours" className="w-full h-full object-contain" />
            </button>
        </div>
    )
}
