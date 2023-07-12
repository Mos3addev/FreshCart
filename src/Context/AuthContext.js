import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext =  createContext(null)
export default function AuthContextProvider(props){
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
      function saveUserData() {
        let encodedToken = localStorage.getItem('token');
        let decodedToken = jwtDecode(encodedToken);
        setToken(encodedToken)
        setUserData(decodedToken);
      }
      function logOut(){
        localStorage.removeItem('token');
        setUserData(null);
        return <Navigate to='login'/>
      }
      useEffect(()=>{
        if(localStorage.getItem('token')!==null){
          saveUserData();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    return <AuthContext.Provider value={{userData,token,setUserData,saveUserData ,logOut}}>
        {props.children}
    </AuthContext.Provider>
}