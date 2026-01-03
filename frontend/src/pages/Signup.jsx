import React, { useState } from 'react'
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
     <div className="border shadow-lg p-6 w-80 bg-white rounded">
      <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
      <form onSubmit={handlesubmit}>
        <div className='mb-4'>
            <label className='block text-gray-700'>Username</label>
            <input 
              type="text" 
              onChange={(e) => setName(e.target.value)}
              id="username"  
              name="username" 
              required 
              placeholder='Enter Name'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              id="email"  
              name="email" 
              required 
              placeholder='Enter Email'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input 
              type="password"  
              onChange={(e) => setPassword(e.target.value)}
              id="password"  
              name="password" 
              required 
              placeholder='******'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <button className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        type='submit'
        >Signup</button>
        <p className='mt-4 text-center'>
            Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a>
        </p>
      </form>
      </div>
    </div>
  )
}

export default Signup
