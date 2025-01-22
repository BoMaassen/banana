import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    const contextData ={
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logOut: logOut,
    }

    useEffect(() => {
        console.log("aplicatie refresht")
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)){
            void login(token);

        }else{
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });

        }


    }, []);

   async function login(token){
       localStorage.setItem('token', token);
       const decodedToken = jwtDecode(token);

        try {
            const result = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            setAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,

                },
                status: 'done',
            });

        }catch (e){
            console.error(e + " Er is wat fout gegaan.")
        }
       console.log("Gebruiker is ingelogd!");
       navigate("/profile");

    }

    function logOut(){
        localStorage.removeItem("token")
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        })
        console.log("Gebruiker is uitgelogd")
        navigate("/");
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>even wacht a.u.b.</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
