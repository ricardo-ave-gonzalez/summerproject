import React, { useState, useEffect } from "react";
import SignInSignUp from "./page/SignInSignUp";
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../src/utils/contexts'
import { isUserLogedApi } from "../src/api/auth" 

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(isUserLogedApi());
    //console.log(isUserLogedApi())
  }, [])
  
  return (
    <AuthContext.Provider value={user}>
      {user ? (<h1>No estas logeado</h1>) : (<SignInSignUp />)}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
