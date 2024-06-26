import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [userName, setUserName] = useState("");
    
    const login = async(input)=>{
        try {
            const res = await axios.post("http://localhost:3002/api/auth/login", input);
            document.cookie = `token=${res.data.token};`;
            console.log("cookies:", document.cookie);
            console.log("user", res.data);

            setIsAuthenticated(true);
            setCurrentUser({ name: res.data.name, email: res.data.email });
            setUserName(res.data.name); 
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    }

    const logout = async(req,res)=>{
        try {
            const res = await axios.post("http://localhost:3002/api/auth/logout");
            console.log(res);
            if (res.data.signout) {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                setIsAuthenticated(false);
                setCurrentUser(null);
                setUserName("");
                localStorage.clear();
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    // const myTask = async(req,res)=>{
    //     const result = await axios.post("http://localhost:3002/api/auth/myTask")
    //     console.log(result)
    //     document.cookie=`token=${res.data.token};`
    //     console.log("cookies:",document.cookie)
    //     console.log("user", res.data)

    //     setCurrentUser({name:res.data.name, email:res.data.email})
    // }

    // useEffect(()=>{
    //   //  localStorage.setItem("user",JSON.stringify(currentUser))
    // },[currentUser])

    return(
        <AuthContext.Provider value={{ isAuthenticated, userName, currentUser, login, logout }}>
        {children}

        </AuthContext.Provider>
    )
}