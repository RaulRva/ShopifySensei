import React, {  useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';

const MiCuenta = () => {


  const supabaseUrl = 'https://dfrcawohbfvnxvxzeyqo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmNhd29oYmZ2bnh2eHpleXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5NDIyNTYsImV4cCI6MjAzMDUxODI1Nn0.d5aWOwBsdOtf1rIKa1cPSin3sRCnDB7n7NLIoI3PiHU';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const  user = localStorage.getItem('login')
  const [rol, setRol] = useState(null);
  const [name, setName] = useState(null);
  const [supabaseId, setSupabaseId] = useState(null);
  const [id, setId] = useState(null);
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user !== null) {
        setSupabaseId(user.id);
        console.log(supabaseId)
      } else {
        setSupabaseId('');
      }
    } catch (e) {
    }
  }

  const fetchData = async () => {
    if (!user) {
      navigate('/iniciar-sesion');
      return;
    }

    const supabaseUrl = 'https://dfrcawohbfvnxvxzeyqo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmNhd29oYmZ2bnh2eHpleXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5NDIyNTYsImV4cCI6MjAzMDUxODI1Nn0.d5aWOwBsdOtf1rIKa1cPSin3sRCnDB7n7NLIoI3PiHU';
  const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { data: userData, error: userError } = await supabase
        .from('Subs')
        .select('rol, name, id , imagen_url')
        .eq('email', user);

      if (userError) {
        throw new Error('Error al obtener el rol del usuario: ' + userError.message);
      }

      setRol(userData[0]?.rol);
      setName(userData[0]?.name);
      setId(userData[0]?.id);
      setImagen(userData[0]?.imagen_url);
      console.log(imagen)
    } catch (error) {
      console.error(error.message);
    }
  };

  
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('login');
    if (userFromLocalStorage) {
      fetchData();
    } else {
      navigate('/iniciar-sesion');
    }
  }, [navigate]);
  
  useEffect(() => {
    getUser();
  }, [supabaseId])


  return (
    <>
    <div className=" md:flex justify-between">
      <div className="w-full p-4">
        <h2 className="text-xl text-center font-bold mb-4">Informació de l'usuari</h2>
        <img src={`https://dfrcawohbfvnxvxzeyqo.supabase.co/storage/v1/object/public/avatars/${supabaseId}/${imagen}`} alt="avatar" className='rounded-full mx-auto my-4  max-w-[300px] max-h-[300px] w-full object-cover' />
        <p><strong>Email:</strong> {user}</p>
        <p><strong>Rol:</strong> {rol}</p>
        <p><strong>Nom:</strong> {name}</p>
        
      </div>
    </div>
    </>
  );
};

export default MiCuenta;