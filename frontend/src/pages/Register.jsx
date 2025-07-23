import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  let navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
        let response = await axios.post('http://localhost:8000/api/register',formData)

        console.log(response.data[0]);
        navigate('/login')
    }catch(err){
        console.error(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-light mb-6 text-center">Create Account</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border-b border-gray-300 focus:border-black outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border-b border-gray-300 focus:border-black outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border-b border-gray-300 focus:border-black outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/" className="text-black underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}