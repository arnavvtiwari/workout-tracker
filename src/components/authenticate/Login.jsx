import React, { useState } from 'react'
import { redirect } from 'react-router-dom'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const emailHandler=(e)=>{
        setemail(e.target.value)
    }
    const passwordHandler=(e)=>{
        setpassword(e.target.value)
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        if(!isValidEmail(email)){
            alert("Enter valid Email")
        }
        try{
            const response = await fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{
                    'content-type':'application/json',

                },
                body: JSON.stringify({email,password})

            }).then(async (res) => {
                const data = await res.json();

                if(res.ok){
                    
                    window.location.href = '/workout';
                }
                else{
                    alert(data.message)
                }
                
            })
        }
        catch(error){
            console.error(error);
        }
    }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={emailHandler}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600 transition duration-200"
                placeholder="Enter your email"
                required
            />
            <label htmlFor="password" className="block text-gray-400 text-sm mb-2">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={passwordHandler}
                className="w-full p-2 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600 transition duration-200"
                placeholder="Enter your password"
                required
            />
            <button
                type="submit"
                onClick={submitHandler}
                className="bg-green-600 hover:bg-green-500 w-full py-2 rounded text-white font-semibold transition duration-200 transform active:scale-95"
            >
                Login
            </button>
        </form>
    </div>
</div>

  )
}

export default Login