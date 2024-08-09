"use client"
import { ChefHat, LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {

  const {data:session} = useSession();
  return (
    <div className='static'>
    <motion.div transition={{duration:1}} initial={{translateY:-100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} className='shadow-md navbar'>
        <Link href="/"><Image src="/logo.png" height={100} width={1000} alt="logo" style={{height:70,width:155}}/></Link>
        <div className="nav-side">
            {session?.user?.username?<span style={{borderRadius:10,padding:10,backgroundColor:'rgb(42,103,177,0.2)'}}  className='flex flex-row shadow-inner'><ChefHat/>{session?.user?.username}</span>:<Link href=
            "/login" className='loginbtn'><LogIn/>Login</Link>}
        </div>
    </motion.div></div>
  )
}

export default Navbar