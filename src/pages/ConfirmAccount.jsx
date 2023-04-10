import React from 'react'
import { useEffect, useState } from "react"
import { useParams, Link} from 'react-router-dom'
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"

const ConfirmAccount = () => {

  const [ alert, setAlert ] = useState({}) 
  const [ confirmAccount, setConfirmAccount ] = useState(false)

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        debugger
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient(url)

        setAlert({
          msg: data.msg,
          error: false
        })
        setConfirmAccount(true)
      } catch (error) {
        setTimeout(() => {
          setAlert({
            msg: error.response.data.msg,
            error: true,
          });
        }, 3000);
      }
    }
    confirmAccount()
  }, [])

  const { msg } = alert

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y comienza a registrar las
      <span className="text-slate-700"> empresas</span>
    </h1>
    <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alert alert={alert}/>}

      {confirmAccount && (
                  <Link
                  className="block text-center my-5 text-slate-500 uppercase text-sm"
                  to="/"
                  > Inicia Sesión </Link>
      )}
    </div>
 </>
  )
}

export default ConfirmAccount