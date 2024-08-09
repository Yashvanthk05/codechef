"use client"
import { Github, Instagram, Linkedin, SquareTerminal, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar';

const Home = () => {
  const query = useParams().query;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchImg() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
          headers: {
            'Authorization': `Client-ID VjmowD9h0zZJIaAuXryy7wJLwI6ZusFlkD8teNQDRZE`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setImages(data.results);
        } else {
          setError("Error Fetching Image");
        }
      } catch (error) {
        console.log(error);
        setError("Error Fetching Image");
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchImg();
    }
  }, [query]);

  if (loading) return <div style={{minHeight:'100dvh',display:'flex',justifyContent:'center',alignItems:'center'}}>Loading...</div>;
  if (error) return <div style={{minHeight:'100dvh',display:'flex',justifyContent:'center',alignItems:'center'}}>{error}</div>;

  return (
    <section className='flex'>
      <Navbar/>  
      <div className='flex items-center mt-40 justify-center flex-col gap-8'>
        <span style={{ fontWeight: 600, fontSize: 18 }}>{query.toUpperCase()} RELATED IMAGES</span>
        <div className='images'>
          {images.map(image => (
            <Image
              key={image.id}
              className="image"
              src={image.urls.raw}
              alt={image.alt_description}
              height={200}
              width={200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home;
