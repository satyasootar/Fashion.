import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState("Sign up")
  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <form onClick={onSubmitHandler} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' >
      <div className='inline-flex justify-center items-center gap-2 mb-2 mt-10' >
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      <input type="text" className={`w-full px-3 py-2 border border-gray-800 ${currentState === "Login" ? "hidden" : ""}`} placeholder='Name' required />
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
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