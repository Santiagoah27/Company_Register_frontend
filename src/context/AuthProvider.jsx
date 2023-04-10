import React from 'react'
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ loading, setLoading ] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient('/users/profile', config)
                setAuth(data)
                navigate('/companies')
            } catch (error) {
                setAuth({})
            } 
            setLoading(false)  
        }
        authUser()
    }, [])

    const closeSessionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
           value={{
            auth,
            setAuth,
            loading,
            closeSessionAuth
           }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext