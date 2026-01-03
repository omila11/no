import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            });
            
            if (response.data.success) {
                toast.success('Account created successfully! Please login.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
            <div className="border shadow-2xl p-8 w-96 bg-white rounded-lg">
                <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-medium mb-2'>Username</label>
                        <input 
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required 
                            placeholder='Enter your name'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-medium mb-2'>Email</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            required 
                            placeholder='Enter your email'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-medium mb-2'>Password</label>
                        <input 
                            type="password"  
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required 
                            placeholder='Minimum 6 characters'
                            minLength={6}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                        />
                    </div>
                    <button 
                        className='w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-purple-300'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    <p className='mt-6 text-center text-gray-600'>
                        Already have an account? <a href="/login" className='text-purple-600 hover:underline font-medium'>Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
