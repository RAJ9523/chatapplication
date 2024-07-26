import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar.js';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo (2).png';
import { setUser, setToken } from '../redux/userSlice.js';

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/password`;

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token);

        setData({
          password: "",
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-9 flex justify-center items-center flex-col'>
          <Avatar
            width={50}
            height={50}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
         
        </div>
 <h2 className='font-semibold text-lg mt-8 text-center'>{location?.state?.name}</h2>
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-green-500 text-lg px-4 py-1 hover:bg-green-600 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>

        </form>

        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password?</Link></p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
