"use client"
import { Github, Instagram, Linkedin, SquareTerminal, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
const Home = () => {
  const [query,setQuery]=useState('');
  const [loading,setLoading]=useState(false);
  const [images,setImages] = useState([]);
  const [count,setCount]=useState([]);
  const [error,setError]=useState('');
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
  }, [count]);
    const handleChange=(e)=>{
      setError("");
      setQuery(e.target.value);
    }
  return (
    <section id='home'>
      <motion.div transition={{duration:1}} initial={{filter:'blur(10px)',opacity:0}} whileInView={{filter:'blur(0px)',opacity:1}}>
        <TypeAnimation
      sequence={[
        'Cook Your Image',
        1000,
        'Chat with Chef',
        1000,
        'Code with Chef',
        1000,
        'Cook Your Code',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block',fontWeight:900,color:'rgb(42 103 177)' }}
      repeat={Infinity}
    />
      </motion.div>
        
    <Image src="/chef.png" height={800} width={800} style={{position:'absolute',zIndex:-5,opacity:0.3}}/>
    <motion.div className='homecon' initial={{filter:'blur(10px)',opacity:0}} whileInView={{filter:'blur(0px)',opacity:1}} transition={{duration:1}}>
    <span className='text-2xl' style={{fontWeight:'bold'}}>Cook your Image with Us!</span>
    <span className='searchbar'><input type="text" placeholder='Prompt Your Own Image' required onChange={handleChange}/><button className='lgnbtn cursor-pointer' onClick={()=>setCount(count=>count+1)}><UtensilsCrossed color='white' fontWeight={200}/>{loading?'Prompting':"Prompt"}</button></span>
    </motion.div>
    {error?<span style={{color:'red'}}>{error}</span>:null}
    <motion.div transition={{duration:1}} initial={{filter:'blur(10px)',opacity:0}} whileInView={{filter:'blur(0px)',opacity:1}} className="homesocials">
      <span style={{fontWeight:600,fontSize:18}}>Follow Us</span>
      <Link href="https://www.instagram.com/yash._.k5/" className="homesoc insta"><Instagram/></Link>
      <Link href="https://github.com/Yashvanthk05" className="homesoc git"><Github/></Link>
      <Link href="https://www.linkedin.com/in/yashvanth-karunakaran-35288828b/" className="homesoc linked"><Linkedin/></Link>
    </motion.div>
    {images.length?
    <div className='flex items-center justify-center flex-col gap-8'>
      <span style={{fontWeight:600,fontSize:18}}>Images Prompt Results</span>
      <div className='images'>
        {images.map(image=>(
         <>
        <Image className="image" src={image.urls.raw} alt={image.alt_description}height={200} width={200}/></>
      ))}
      </div>
      
    </div>:null}
    </section>
  )
}

export default Home