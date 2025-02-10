import Admindashboard from '@/Pages/Admin/Admindashboard';
import Login from '@/Pages/Admin/Login';
import { fetchProfile } from '@/Redux/Slices/AdminAuthSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

const AdminAuthVarify = () => {
const dispatch = useDispatch();
const [isLoggedIn , setIsLoggedIn] = useState(null);
const navigate = useNavigate();

useEffect(()=>{
   const fetchData = async()=>{
    try{

        const response = await dispatch(fetchProfile());
        console.log("fetching data",response)
        if(response.payload.success){
            setIsLoggedIn(true);
            navigate('/admin-dashboard');
        }

    }
    catch(e){
        console.log(e)
        return

    }
   }
   fetchData()
},[])


if(isLoggedIn === null){
    return <Login/>
}

  return <Outlet/>
}

export default AdminAuthVarify
