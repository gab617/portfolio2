import { createContext} from 'react'

export const Context = createContext({})

export function ContextProvider({ children }) {



    return (
        <Context.Provider
            value={{
            }}

        >
            {children}
        </Context.Provider>
    )
}
