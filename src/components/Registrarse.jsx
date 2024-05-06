import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Registrarse() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [supabaseId, setSupabaseId] = useState(null);
  const [error, setError] = useState(null);

  const supabaseUrl = 'https://dfrcawohbfvnxvxzeyqo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmNhd29oYmZ2bnh2eHpleXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5NDIyNTYsImV4cCI6MjAzMDUxODI1Nn0.d5aWOwBsdOtf1rIKa1cPSin3sRCnDB7n7NLIoI3PiHU';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const getUser = async () => {

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user !== null) {
        setSupabaseId(user.id);
      } else {
        setSupabaseId('');
      }
    } catch (e) {
    }
  }

  async function uploadImage(e) {
    let file = e.target.files[0];
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(supabaseId + "/" + uuidv4(), file)

    if (data) {
      getMedia();

    } else {
      console.log(error);
    }
  }

  async function getMedia() {

    const { data, error } = await supabase.storage.from('avatars').list(supabaseId + '/', {
      limit: 1,
      offset: 0,
      sortBy: {
        column: 'created_at', order:
          'desc'
      }
    });

    if (data) {
      setImagenUrl(data[0].name);
      console.log(data)
      console.log(imagenUrl)
    } else {
      console.log(71, error);
    }
  }

  useEffect(() => {
    getUser();
    getMedia();
  }, [supabaseId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          
          if (error) {
            throw error;
          }else{
            navigate('/iniciar-sesion')
          }
          
          
          const { data: dbData, error: dbError } = await supabase
            .from('Subs')
            .insert([
              {
                name: nombre,
                email: email,
                rol: 'registrado',
                imagen_url: imagenUrl
              },
            ]);
          if (dbError) {
            console.error("Error al insertar datos en clientes:", dbError);
            throw dbError;
          }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImagenChange = (event) => {
    setImagenUrl(event.target.value);
  };
  return (
    <div className="flex justify-center items-center h-screen lg:h-[50vh] mt-12">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md lg:w-[600px]">
        <h2 className="text-2xl font-semibold mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col items-center">
          <img src={`https://dfrcawohbfvnxvxzeyqo.supabase.co/storage/v1/object/public/avatars/${supabaseId}/${imagenUrl}`} alt="avatar" className="w-72 h-72 object-cover mb-3" />
          <label htmlFor="imagen" className="block text-sm font-semibold mb-2">Seleccionar imágen:</label>
          <input type="file" onChange={(e) => uploadImage(e)} />
        </div>
        <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-red-500"
              required
            />
          </div>
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
          <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
            Registrarse
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Registrarse;