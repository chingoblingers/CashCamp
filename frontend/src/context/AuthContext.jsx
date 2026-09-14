import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

 export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true: false)

    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>

    )
}

export function useAuth() {
    return useContext(AuthContext)
}