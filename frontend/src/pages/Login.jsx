import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState("Signup")
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Signup') {
        const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        console.log("res: ", res.data);
        console.log("success: ", res.data?.success);

        if (res?.data?.success === true) {
          setToken(res.data.token)
          console.log("res.data.token: ", res.data.token);
          localStorage.setItem("token", res.data.token)
          toast.success("User created")
          setEmail("")
          setPassword("")
          setName("")
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        console.log("res: ", res);
        if (res?.data.success === true) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
          toast.success(res.data.message)
          setEmail("")
          setPassword("")
          setName("")
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log("error: ", error);
      console.log(error.message);

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' >
      <div className='inline-flex justify-center items-center gap-2 mb-2 mt-10' >
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" className={`w-full px-3 py-2 border border-gray-800 ${currentState === "Login" ? "hidden" : ""}`} placeholder='Name' />
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px] ' >
        <p className={`cursor-pointer ${currentState === "Login" ? "" : "hidden"} `} >Forgot your password?</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Signup')} className='cursor-pointer' >Create account</p> : <p onClick={() => setCurrentState('Login')} className='cursor-pointer' >Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-900' >{currentState === 'Login' ? "Sign in" : "Sign Up"}</button>
    </form>
  )
}

export default Login