import axios from 'axios';
import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useUserContext } from '../Context/UserContext';
function Reg_Log() {
    const {setUser}=useUserContext()
    const [registration,setRegistration]=useState(false);
    const [formData,setFormData]=useState({})
    const navigate=useNavigate()
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    function Register(){
        axios.post("api/v1/auth/register",formData)
            .then((res)=>{
                if (res.status !== 200 && res.status !== 201) {
                    handleOpenModal('An error occurred: ' + res.statusText);
                }
                console.log(res)
            })
            .catch((err)=>{
                handleOpenModal('An error occurred: ' + err);
            })
    }
    
    function Login(e){
        e.preventDefault()
        axios.post("/api/v1/auth/login",formData)
        .then((res)=>{
            if (res.status !== 200 && res.status !== 201) {
                handleOpenModal('An error occurred: ' + res.statusText);
            }
            setUser(res.data.user)
            navigate("/Dashboard")
        })
        .catch((err)=>{
            handleOpenModal('An error occurred: ' + err);
        })
    }
    return (
        <div>
            <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 place-items-center">
                <div className="text-md w-full md:w-96 p-6">
                    {/* Error */}
                    <div className="z-20 grid place-items-center">
                    </div>
                    <div className='grid place-items-start'>
                        <h3 class="font-bold text-lg text-center flex flex-col place-items-center text-blue-500">
                            <img class="w-10 lg:w-14" src="https://upload.wikimedia.org/wikipedia/en/0/01/CDOT_logo.gif" />
                            C-DOT
                        </h3>
                    </div>
                    {registration &&
                        <div className="text-black grid gap-4 w-full">
                            <h1 className="font-bold text-2xl md:text-3xl leading-4 text-center md:text-left">Register for an Account</h1>
                            <p className="text-center font-semibold md:text-left">Create your Account for AI check Dashboard</p>
                            <form onSubmit={Register} method="POST" className="grid gap-3 place-items-center">
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='firstName' value={formData.firstName || ''} onChange={handleInputChange} placeholder="First Name" type="text" />
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='lastName' value={formData.lastName || ''} onChange={handleInputChange} placeholder="Last Name" type="text" />
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='email' value={formData.email || ''} onChange={handleInputChange} placeholder="Email" type="email" />
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='userName' value={formData.userName || ''} onChange={handleInputChange} placeholder="Username" type="text" />
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='password' value={formData.password || ''} onChange={handleInputChange} placeholder="Password" type="password" />
                                <button className="p-2 w-full text-lg tracking-wider font-semibold bg-blue-600 text-white">Register</button>
                                <p className="text-center">Already have an account? <b className="text-blue-600 cursor-pointer"><a onClick={()=>{setRegistration(false)}}>Login</a></b></p>
                            </form>
                        </div>}
                    {!registration &&
                        <div className="text-black grid gap-4 w-full">
                            <h1 className="font-bold text-2xl md:text-3xl leading-4 text-center md:text-left">Login to your Account</h1>
                            <p className="text-center font-semibold md:text-left">Welcome back to your AI check Dashboard</p>
                            <form onSubmit={Login} method="POST" className="grid gap-3 place-items-center">
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='userName' value={formData.userName || ''} onChange={handleInputChange} placeholder="Username" type="text" />
                                <input className="p-2 w-full outline-0 border-2 border-gray-300" name='password' value={formData.password || ''} onChange={handleInputChange} placeholder="Password" type="password" />
                                <button className="p-2 w-full text-lg tracking-wider font-semibold bg-blue-600 text-white">Login</button>
                                <p className="text-center">Don't have an account? <b className="text-blue-600 cursor-pointer"><a onClick={()=>{setRegistration(true)}}>Register</a></b></p>
                            </form>
                        </div>}
                </div>

                <div className="hidden md:block w-full h-full relative">
                    <div className="absolute inset-0" 
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                        backgroundPosition: "center",   
                        backgroundRepeat: "no-repeat",  
                        backgroundSize: "cover"         
                      }}
                    >
                        <div className="bg-blue-500 w-full h-full opacity-65"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reg_Log