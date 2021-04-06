import React, { useEffect, useState } from "react";
import app from "./firebaseconfig";
export const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);
    if (pending) {
        return <>Please wait...</>
    }
    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;