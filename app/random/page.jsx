"use client"
import { Github, Instagram, Linkedin, SquareTerminal, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';

const RandomImages = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRandomImages() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=16`, {
          headers: {
            'Authorization': `Client-ID VjmowD9h0zZJIaAuXryy7wJLwI6ZusFlkD8teNQDRZE`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          setError("Error Fetching Images");
        }
      } catch (error) {
        console.log(error);
        setError("Error Fetching Images");
      } finally {
        setLoading(false);
      }
    }

    fetchRandomImages();
  }, []);

  if (loading) return <div style={{minHeight:'100dvh',display:'flex',justifyContent:'center',alignItems:'center'}}>Loading...</div>;
  if (error) return <div style={{minHeight:'100dvh',display:'flex',justifyContent:'center',alignItems:'center'}}>{error}</div>;

  return (
    <section className='flex'>
        <Navbar />
      <div className='flex items-center justify-center mt-40 flex-col gap-8'>
        <span style={{ fontWeight: 600, fontSize: 18 }}>RANDOM IMAGES</span>
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

export default RandomImages;