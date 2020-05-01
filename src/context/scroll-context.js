import React, {useState, useEffect, createContext} from 'react'

const WindowScrollContext = createContext(undefined)

function WindowScrollProvider ({children}) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', function (ev) {
            setScrollY(this.scrollY + this.innerHeight)
        })
    }, [])
    
    return (
        <WindowScrollContext.Provider value={scrollY}>
            {children}
        </WindowScrollContext.Provider>
    )
}

function useWindowScrollY() {
    const context = React.useContext(WindowScrollContext);

    if (context === undefined) {
        throw new Error('useWindowScrollY must be used within a WindowScrollProvider')
    }
    
    return context
}

export {WindowScrollProvider,useWindowScrollY}

