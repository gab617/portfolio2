/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import { themes } from './themes'

export const Context = createContext({})

export function ContextProvider({ children }) {
    const colorsCant = themes.colours.length-1

    const [currentTheme, setCurrentTheme] = useState(themes.dark)
    const [indexColor, setIndexColor] = useState(0)

    const setTheme = (theme) => {
        if(theme === "colours"){
            let index = indexColor
            if (indexColor<colorsCant){
                index++
            }else{
                index=0
            }
            setIndexColor(index)
            setCurrentTheme(themes.colours[index])
            return
        }
        if (themes[theme]) {
            setCurrentTheme(themes[theme]);
        } else {
            console.warn(`El tema ${theme} no está definido`);
        }
    };

    useEffect(() => {
        document.body.style.background = currentTheme.background;
        document.body.style.color = currentTheme.color;
        

    }, [currentTheme]);
    
    return (
        <Context.Provider
            value={{
                currentTheme, setTheme
            }}

        >
            {children}
        </Context.Provider>
    )
}
