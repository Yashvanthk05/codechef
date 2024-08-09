"use client"
import React, { useState } from 'react';
import { ChefHat, Lock, Mail, User2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [detail, setDetail] = useState({ username: "", password: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.email || !detail.username || !detail.password) {
      setError("Fill all the Fields");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(detail),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 409) {
        setError("User Already Exists");
      } else if (res.ok) {
        router.push("/login");
      } else {
        setError("Failed to register");
      }
    } catch (error) {
      console.error("Register Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='loginpage'>
      <span style={{ fontSize: 24, fontWeight: 800 }}>Register to <span style={{ color: 'rgb(75, 156, 255)' }}>CodeChef</span></span>
      <form className='logincontainer' onSubmit={handleSubmit}>
        <span className='input'><Mail /><input type="email" placeholder='Email' name='email' onChange={handleChange} /></span>
        <span className='input'><User2 /><input type="text" placeholder='Name' name='username' onChange={handleChange} /></span>
        <span className='input'><Lock /><input type="password" placeholder='Password' name='password' onChange={handleChange} /></span>
        {error && <span className='error'>{error}</span>}
        <span className='input submit'><ChefHat /><input type="submit" value="Register" disabled={submitting} /></span>
      </form>
      <span style={{ fontWeight: 'bold' }}>Already have an account? <Link href="/login" style={{ color: 'rgb(75, 156, 255)' }}>Login</Link></span>
    </section>
  );
};

export default Register;
