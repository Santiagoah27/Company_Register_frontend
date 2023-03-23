import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"

const ForgotPassword = () => {
  const [ email, setEmail ] = useState('') 
  const [ alert, setAlert ] = useState({}) 

  const handleSubmit = async e => {
    e.preventDefault()
    if(email === '') {
      setAlert({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

   try {
    const { data } = await axiosClient.post(`/users/forgot-password`, { email })
    setAlert({
      msg: data.msg,
      error: false
    })
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
    <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso y no pierdas las
      <span className="text-slate-700"> empresas</span>
    </h1>

    { msg && <Alert alert={alert}/>}

    <form 
    className="my-10 bg-white shadow rounded-lg px-10 py-10"
    onSubmit={handleSubmit}
    >
     <div className="my-5">
         <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
         <input 
             id="email"
             type="email"
             placeholder="Email de Registro"
             className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
             value={email}
             onChange={ e => setEmail(e.target.value)}
         />
     </div>

     <input type="submit"
            value="Enviar instrucciones"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors" />
    </form>

    <nav className="lg:flex lg:justify-between">
       <Link
       className="block text-center my-5 text-slate-500 uppercase text-sm"
       to="/"
       >
         ¿Ya tienes una cuenta? Inicia Sesión  
       </Link>
       <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
          >
            ¿No tienes un cuenta? Registrate  
          </Link>
    </nav>

 </>
  )
}

export default ForgotPassword