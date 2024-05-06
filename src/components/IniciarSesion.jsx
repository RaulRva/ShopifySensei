import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, useNavigate } from 'react-router-dom';

function IniciarSesion() {
  const navigate = useNavigate();
  const supabaseUrl = 'https://dfrcawohbfvnxvxzeyqo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmNhd29oYmZ2bnh2eHpleXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5NDIyNTYsImV4cCI6MjAzMDUxODI1Nn0.d5aWOwBsdOtf1rIKa1cPSin3sRCnDB7n7NLIoI3PiHU';
  const supabase = createClient(supabaseUrl, supabaseKey);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const HandleId = async () => {
        try {
            const email = localStorage.getItem('login');
            const { data, error } = await supabase
                .from('Subs')
                .select('id')
                .eq('email', email);

            if (error) {
                console.error('Error al obtener los datos del usuario:', error.message);
                return '';
            }

            return data;
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error.message);
            return null;
        }
    }

    const fetchUserRole = async (email) => {
        try {
        const { data, error } = await supabase
            .from('Subs')
            .select('rol')
            .eq('email', email);

        if (error) {
            console.error('Error al obtener el rol del usuario:', error.message);
            return null;
        }

        return data[0];
        } catch (error) {
        console.error('Error al obtener el rol del usuario:', error.message);
        return null;
        }
    };
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
        throw error;
        }else{      
            localStorage.setItem('login', data.user.email)
            const userRoleData = await fetchUserRole(data.user.email);
            const userIdData = await HandleId(data.user.email);
            const userId = userIdData[0].id || null
            console.log('ID', userId)
            const userRole = userRoleData?.rol || null;
            console.log('ROL', userRole)
            localStorage.setItem('rol', userRole);
            localStorage.setItem('id', userId);
            navigate('/')
        }

    } catch (error) {
        setError(error.message);
    }
    };
  return (
    <div className="flex justify-center items-center lg:h-[50vh] mt-12 px-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md  lg:w-[600px]">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className='w-full flex justify-center my-8'>
            <button type="submit" className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
              Iniciar Sesión
            </button>
          </div>
          <div className='flex items-center gap-4'>
          <p>Si no tens compte, pots registrarte aquí</p>
            <Link to="/registrarse" className="bg-black text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
              Registrarse
            </Link>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default IniciarSesion;