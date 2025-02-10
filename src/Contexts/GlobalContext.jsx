import React, { createContext, useState } from 'react'

export let GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [loginRedirection, SetLoginRedirection] = useState(null);
    
    return <GlobalContext.Provider
        value={{
            loginRedirection,
            SetLoginRedirection
        }}>
        {children}
    </GlobalContext.Provider>
}
