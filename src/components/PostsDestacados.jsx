import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Post1 from '../assets/Post1.png';
import Post2 from '../assets/Post2.png';
import Post3 from '../assets/Post3.png';

const photoPaths = [Post1, Post2, Post3];

function PostsDestacados() {
    const [posts, setPosts] = useState(null);
    const supabaseUrl = 'https://dfrcawohbfvnxvxzeyqo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmNhd29oYmZ2bnh2eHpleXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5NDIyNTYsImV4cCI6MjAzMDUxODI1Nn0.d5aWOwBsdOtf1rIKa1cPSin3sRCnDB7n7NLIoI3PiHU';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('Posts')
                .select();
            if (error) {
                console.error('Error al obtener los posts:', error.message);
            } else {
                const formattedPosts = data.map((post, index) => {
                    const createdAt = new Date(post.created_at);
                    const formattedDate = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
                    const photoPath = photoPaths[index % photoPaths.length];
                    return { ...post, formattedDate, photoPath };
                });
                setPosts(formattedPosts);
            }
        } catch (error) {
            console.error('Error al obtener los posts:', error.message);
        }
    }

    return (
        <div className="container mx-auto py-4">
            <h2 className='text-xl md:text-4xl font-bold text-center w-full'>Posts Destacados</h2>
            {posts && posts.map(post => (
                <div key={post.id} className="max-w-sm rounded overflow-hidden shadow-lg my-4">
                    <div className="py-4 rounded">
                        <img src={post.photoPath} alt={`Post ${post.id}`} className='rounded' />
                        <div className='px-6 mt-4'>
                            <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                            <p className="text-gray-700 text-base mb-2">{post.description}</p>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            <p className="text-gray-600 italic text-sm">{post.formattedDate}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostsDestacados;
