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


function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Hero/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/book-consultation' element = {<BookConsultation/>}/>
        <Route path='/admin-login' element={<Login/>}/>
        <Route path='/admin-dashboard/*' element={<Admindashboard/>}/>
     
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
