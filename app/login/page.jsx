"use client"
import React, { useState } from 'react';
import { Lock, Mail, Utensils } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [detail, setDetail] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.email || !detail.password) {
      setError("Fill all the Fields");
      return;
    }
    try {
      setSubmitting(true);
      const res = await signIn('credentials', {
        email: detail.email,
        password: detail.password,
        redirect: false
      });
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign in Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='loginpage'>
      <span style={{ fontWeight: 800, fontSize: 24 }}>Login to <span style={{ color: 'rgb(75, 156, 255)' }}>CodeChef</span></span>
      <form className='logincontainer' onSubmit={handleSubmit}>
        <span className='input'><Mail /><input type="text" placeholder='Email' name='email' onChange={handleChange} /></span>
        <span className='input'><Lock /><input type="password" placeholder='Password' name='password' onChange={handleChange} /></span>
        {error && <span className='error'>{error}</span>}
        <span className='input submit'><Utensils /><input type="submit" value="Login" disabled={submitting} /></span>
      </form>
      <span style={{ fontWeight: 'bold' }}>Don't have an account? <Link href="/register" style={{ color: 'rgb(75, 156, 255)' }}>Register</Link></span>
    </section>
  );
};

export default Login;
