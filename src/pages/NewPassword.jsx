import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"
const NewPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ validToken, setValidToken ] = useState(false)
  const [ passwordModified, setPasswordModifed ] = useState(false)

  const params = useParams()
  const [ alert, setAlert ] = useState({}) 
  const { token } = params;
  
  useEffect(() => {
    const validateToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`)
        setValidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    validateToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlert({
        msg: 'El Password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/users/forgot-password/${token}`

      const { data } = await axiosClient.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordModifed(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y no pierdas acceso a las
      <span className="text-slate-700"> empresas</span>
    </h1>

    {msg && <Alert alert={alert}/>}

    {validToken && (
        <form 
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={handleSubmit}
        >
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
              <input 
                  id="password"
                  type="password"
                  placeholder="Escribe tu Nuevo Password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
          </div>
     
          <input type="submit"
                 value="Guardar Nuevo Password"
                 className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors" />
         </form>
    )}
          {passwordModified && (
                  <Link
                  className="block text-center my-5 text-slate-500 uppercase text-sm"
                  to="/"
                  > Inicia Sesión </Link>
      )}
 </>
  )
}

export default NewPassword