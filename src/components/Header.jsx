import React from 'react'
import { Link } from "react-router-dom"
import useCompanies from "../hooks/useCompanies"
import useAuth from "../hooks/useAuth"

const Header = () => {

  const { closeSessionCompanies } = useCompanies()
  const { closeSessionAuth } = useAuth()

  const handleClosedSession = () => {
     closeSessionAuth()
     closeSessionCompanies()
     localStorage.removeItem('token')
  }
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                Company Register
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <Link 
                   to="/companies" 
                   className="font-bold uppercase"
                >Companies</Link>
                <button
                   onClick={handleClosedSession}
                   type="button"
                   className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                >Cerrar Sesión</button>
            </div>
        </div>

    </header>
  )
}

export default Header