import { useContext } from 'react';
import Login from './../Login/Login';
import { AuthContext } from '../../Context/AuthContext';

export default function ProtectedRoute({children}) {
    let{userData , saveUserData } = useContext(AuthContext)
    if(userData === null){
        return <Login saveUserData={saveUserData}/>
    }
    else{
        return children;
    }
}
