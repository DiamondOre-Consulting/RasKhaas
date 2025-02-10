import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './Pages/Hero'
import AllUsers from './Pages/AllUsers'
import BookConsultation from './Pages/BookConsultation'
import Admindashboard from './Pages/Admin/Admindashboard'
import Login from './Pages/Admin/Login'
import RegisterUser from './Components/Admin/RegisterUser'
import MainHome from './Pages/MainHome'
import AdminAuthVarify from './Components/Admin/AdminAuthVarify'


function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainHome/>}/>
        <Route path='/book-consultation' element = {<BookConsultation/>}/>
        <Route path='/admin-login' element={<Login/>}/>
         <Route element={<AdminAuthVarify/>}>
        <Route path='/admin-dashboard/*' element={<Admindashboard/>}/>
        </Route>
     
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
