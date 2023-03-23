import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"

const Register = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repeatPassword, setRepeatPassword ] = useState('')
  const [ alert, setAlert ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if([name, email, password, repeatPassword].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repeatPassword){
      setAlert({
        msg:'Los passwords no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlert({
        msg:'El Password es muy corto, debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }

    setAlert({})

    //Create User from API
    try {
       const { data } = await axiosClient.post(`/users`, { name, email, password})
       setAlert({
        msg: data.msg,
        error: false
       })

       setName('')
       setEmail('')
       setPassword('')
       setRepeatPassword('')
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
       <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y registra las
         <span className="text-slate-700"> empresas</span>
       </h1>

       {msg && <Alert alert={alert}/>}

       <form className="my-10 bg-white shadow rounded-lg px-10 py-10" 
        onSubmit={handleSubmit}>
       <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
            <input 
                id="nombre"
                type="text"
                placeholder="Nombre de Registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
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
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
            <input 
                id="password2"
                type="password"
                placeholder="Repetir Password"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
            />
        </div>

        <input type="submit"
               value="Crear Cuenta"
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
          to="/forgot-password"
          >
            Olvide mi password  
          </Link>
       </nav>

    </>
  )
}

export default Register