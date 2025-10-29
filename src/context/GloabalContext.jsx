import React, { createContext, useContext, useState } from 'react'

// Step 1: Create the context
const GlobalContext = createContext()



export const GlobalProvider = ({ children }) => {
    const [username, setUsername] = useState(null)
    const [userStats, setUserStats] = useState([])
    const [notification, setNotification] = useState(null)
    const [characterInfo, setCharacterInfo] = useState({})
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{ user, setUser, username, setUsername, userStats, setUserStats, notification, setNotification, characterInfo, setCharacterInfo }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Step 3: Custom hook to access the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider')
    }
    return context
}
