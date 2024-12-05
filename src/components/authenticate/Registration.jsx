import React, { useState } from 'react'
import { redirect } from 'react-router-dom'

const Registration = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [password2, setpassword2] = useState("")
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    const nameHandler=(e)=>{
        setname(e.target.value)
    }
    const emailHandler=(e)=>{
        setemail(e.target.value)
        

    }
    const checkPass=(pass1,pass2)=>{
        if(pass1!==pass2){
            alert("Paswords do not match")
        }
    }
    const passHandler=(e)=>{
        setpassword(e.target.value)
    }
    const passHandle2r=(e)=>{
        setpassword2(e.target.value)
        
    }
    const registerHandler= async (e)=>{
        e.preventDefault();
        if(!isValidEmail(email)){
            alert("Enter valid Email")
        }
        checkPass(password,password2)
        try{
            const response = await fetch('http://localhost:3000/register',{
              method: 'POST',
              headers:{
                'content-type':'application/json',
      
              },
              body: JSON.stringify({name, email, password}),
            }).then(async (response) => {
                const data = await response.json()
                if(response.ok){
                    window.location.href = '/login';
                }
                else{
                    alert(data.message)
                  console.error("Failed")
                }
            })
            
          }
          catch(error){
            console.error(error)
          }
    }


  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
            <label htmlFor="name" className="block text-gray-400 text-sm mb-2">Name</label>
            <input
                type="name"
                id="name"
                value={name}
                onChange={nameHandler}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600 transition duration-200"
                placeholder="Enter your name"
                required
            />
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
                onChange={passHandler}
                className="w-full p-2 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600 transition duration-200"
                placeholder="Enter your password"
                required
            />
            <label htmlFor="password" className="block text-gray-400 text-sm mb-2">Confirm Password</label>
            <input
                type="password"
                id="password"
                value={password2}
                onChange={passHandle2r}
                className="w-full p-2 mb-6 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600 transition duration-200"
                placeholder="Re enter your password"
                required
            />
            <button
                type="submit"
                onClick={registerHandler}
                className="bg-green-600 hover:bg-green-500 w-full py-2 rounded text-white font-semibold transition duration-200 transform active:scale-95"
            >
                Login
            </button>
        </form>
    </div>
</div>
  )
}

export default Registration