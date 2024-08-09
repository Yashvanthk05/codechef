"use client"
import { Ban, CheckCircle2, MessageCircle, Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const Chat = () => {
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [mess, setMess] = useState('');
  const [messages, setMessages] = useState(session?.user?.message || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if(e.key==='enter'){
      handleSend();
    }
  }

  const handleSend = async () => {
    if (!mess.trim()) return;

    const newMessages = [...messages, mess];
    setMessages(newMessages);

    try {
      setLoading(true);
      const res = await fetch('/api/message', {
        method: 'PATCH',
        body: JSON.stringify({
          username: session?.user?.username,
          message: newMessages
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 500) {
        setError("Error in Sending the Message");
      } else if (res.status === 404) {
        setError("Please Login. No User is found");
      }
    } catch (error) {
      setError("Error in Sending the Message");
    } finally {
      setLoading(false);
    }

    setMess('');  // Clear input after sending
  }

  return (
    <section id="chat">
      <span style={{ fontSize: 24, fontWeight: 700 }}>Chat With Us</span>
      {error && <span style={{ color: 'red', display: 'flex' }}><Ban />{error}</span>}
      <motion.div transition={{duration:1}} initial={{filter:'blur(10px)',translateX:-50,opacity:0}} whileInView={{filter:'blur(0px)',opacity:1,translateX:0}} className='chatbox'>
        <span className='chatboxhead'><MessageCircle />Chatbox</span>
        <div className='chatboxcon'>
          <span className='sentmess'><Send className='absolute' style={{ color: 'grey', left: '-22px', bottom: 3, height: 18 }} />Welcome to CodeChef!!</span>
          {messages.map((mes, index) => (
            <span key={index} className='ourmess'>{mes}<CheckCircle2 className='absolute' size={18} color='grey' style={{right:-20,bottom:2}}/></span>
          ))}
        </div>
        <span className='messagesender'>
          <input
            type="text"
            placeholder={loading ? 'Sending your message' : 'Type your message...'}
            value={mess}
            onChange={(e)=>setMess(e.target.value)}
            onKeyDown={handleChange}
          />
          <button className='sendbtn' onClick={handleSend} disabled={loading}>
            <Send />
          </button>
        </span>
      </motion.div>
    </section>
  )
}

export default Chat;
