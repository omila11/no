import React from 'react'

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
     <div className="border shadow- p-6 w-80 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form >
        <div className='mb-4'>
            <label className=' block text-gray-700'>Username</label>
            <input 
              type="text"  
              id="username"  
              name="username" 
              required 
              placeholder='Enter Name' />
        </div>
        <div className='mb-4'>
            <label className=' block text-gray-700'>Email</label>
            <input 
              type="email"  
              id="email"  
              name="email" 
              required 
              placeholder='Enter Email' />
        </div>
        <div className='mb-4'>
            <label className=' block text-gray-700'>Password</label>
            <input 
              type="password"  
              id="password"  
              name="password" 
              required 
              placeholder='******' />
        </div>
        <button>Signup</button>
      </form>
      </div>
    </div>
  )
}

export default Signup
