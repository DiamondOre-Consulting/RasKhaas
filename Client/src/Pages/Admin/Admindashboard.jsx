import React, { useEffect } from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Main from '../../Components/Admin/Main'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUser } from '../../Redux/Slices/AdminAuthSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterUser from '../../Components/Admin/RegisterUser'
import AdminAuthVarify from '@/Components/Admin/AdminAuthVarify'

const Admindashboard = () => {

  const dispatch = useDispatch();
  const user = useSelector((state)=> state?.auth?.allusers)
 
  useEffect(()=>{
    dispatch(fetchAllUser())
  },[dispatch])
  return (
    <div className=''>
      <Sidebar className=""/>

      <div className="ml-64 p-4 h-screen bg-gray-100">
     
          <Routes>
            {/* <Route element={<AdminAuthVarify/>}> */}
            <Route path="/" element={<Main user={user} />} />
            <Route path="/register-user" element={<RegisterUser />} />
            {/* </Route> */}
            {/* Add other routes here */}
          </Routes>
       
      </div>
      {/* <Main user={user}/> */}
    </div>
  )
}

export default Admindashboard
