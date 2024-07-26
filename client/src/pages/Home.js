import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout,setOnlineUser,setUser,setSocketConnection } from '../redux/userSlice.js'
import Sidebar from '../components/sidebar.js'
import logo from '../assets/logo (2).png'

import io from 'socket.io-client'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('user',user)

  console.log(process.env.REACT_APP_BACKEND_URL);
  const fetchUserDetails = async()=>{
    try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user-details`
        const response = await axios({
          url : URL,
          withCredentials : true
        })

        if(response.data.logout){
            dispatch(logout())
            navigate("/email")
        }
      
        dispatch(setUser(response.data.user));
        console.log(response.data.user.name);
    } catch (error) {
        console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  
  useEffect(()=>{
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
      auth : {
        token : localStorage.getItem('token')
      },
    })

   

    socketConnection.on('onlineUser',(data)=>{
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])



  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
          <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
           <Sidebar/>
        </section>
        {/**message component**/}
        <section className={`${basePath && "hidden"}`} >
            <Outlet/>
        </section>
        
        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home