import {createContext} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const testData ={
        test1: 0,
        test2: 5,
        test3: "ja",
    }
    return (
        <AuthContext.Provider value={testData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
