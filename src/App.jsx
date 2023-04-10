import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectRoute from './layouts/ProtectRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import Companies from './pages/Companies'
import NewCompany from './pages/NewCompany'
import Company from './pages/Company'
import EditCompany from './pages/EditCompany'

import { AuthProvider } from './context/AuthProvider'
import { CompaniesProvider } from './context/CompaniesProvider'

function App() {
  return (
       <BrowserRouter>
       <AuthProvider>
        <CompaniesProvider>
        <Routes>
           <Route path='/' element={<AuthLayout />} >
             <Route index element={<Login />} />
             <Route path='register' element={<Register />} />
             <Route path='forgot-password' element={<ForgotPassword />} />
             <Route path='forgot-password/:token' element={<NewPassword />} />
             <Route path='confirm/:id' element={<ConfirmAccount />} />
           </Route>
           <Route path='/companies' element={<ProtectRoute/>} >
             <Route index element={<Companies />} />
             <Route path='create-companies' element={<NewCompany />} />
             <Route path=':id' element={<Company />} />
             <Route path='edit/:id' element={<EditCompany />} />
           </Route>
        </Routes>
        </CompaniesProvider>
        </AuthProvider>
       </BrowserRouter>
  )
}

export default App
