"use client"
import { ArrowRight, SquareTerminal } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const Docs = () => {
  return (
    <section id='docs'>
        <span style={{fontSize:20,fontWeight:800}}>Documentation</span>
        <motion.div transition={{duration:1}} initial={{filter:'blur(10px)',translateX:-50,opacity:0}} whileInView={{filter:'blur(0px)',opacity:1,translateX:0}} className='docterminal shadow-mds'>
            <div className="dochead"><span>CodePrompter</span>
            <SquareTerminal/></div>
            <hr />
            <div className="doccon flex flex-col gap-5">
                <div className="doc">
                    <span style={{color:'rgb(190, 226, 255)'}}>$ Endpoints</span><div className="doc flex flex-col">
                    <span style={{color:'white'}}>/[query] - Displays Images Related to Query</span>
                    <span style={{color:'white'}}>/random - Displays Random Images</span>
                </div>
                </div>
                
                <div className="doc">
                    <span style={{color:'rgb(190, 226, 255)'}}>$ TechStack Used</span>
                    <div className="doc flex flex-col">
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>NextJS</span>
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>ReactJS</span>
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>MongoDB</span>
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>ExpressJS</span>
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>NodeJS</span>
                    <span style={{color:'white',display:'flex',alignItems:'center'}}><ArrowRight size={15}/>BCrypt</span>
                </div>
                </div>
                <div className="doc">
                    <span style={{color:'rgb(190, 226, 255)'}}>$ API Used</span><div className="doc flex flex-col">
                    <span style={{color:'white'}}>Unsplash API For Developers</span>
                </div>
                </div>
                <div className="doc">
                    <span style={{color:'rgb(190, 226, 255)'}}>$ HTTP Requests Made</span><div className="doc flex flex-col">
                    <span style={{color:'white'}}>GET</span>
                    <span style={{color:'white'}}>POST</span>
                    <span style={{color:'white'}}>PATCH</span>
                </div>
                </div>
            </div>
        </motion.div>

    </section>
  )
}

export default Docs