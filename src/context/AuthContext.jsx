import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const [isAuth, toggleisAuth] = useState(false);
    const navigate = useNavigate();

    const contextData ={
        isAuth: isAuth,
        login: login,
        logOut: logOut,
    }

    function login(){
        toggleisAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logOut(){
        toggleisAuth(false);
        console.log("Gebruiker is uitgelogd")
        navigate("/");
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
