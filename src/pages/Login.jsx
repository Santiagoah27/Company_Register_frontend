import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')){
       setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
       })
       return
       
    }

    try {
      const { data } = await axiosClient.post('/users/login', { email, password})
      setAlert({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/companies')
    } catch (error) {
      setAlert({
        msg: error.response.data,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
       <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y registra las
         <span className="text-slate-700"> empresas</span>
       </h1>

       {msg && <Alert alert={alert}/>}

       <form 
         className="my-10 bg-white shadow rounded-lg px-10 py-10"
         onSubmit={handleSubmit}>
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input 
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
            <input 
                id="password"
                type="password"
                placeholder="Password de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>

        <input type="submit"
               value="Iniciar Sesión"
               className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-800 transition-colors" />
       </form>

       <nav className="lg:flex lg:justify-between">
          <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
          >
            ¿No tienes un cuenta? Registrate  
          </Link>
          <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
          >
            Olvide mi password  
          </Link>
       </nav>

    </>
  )
}

export default Login