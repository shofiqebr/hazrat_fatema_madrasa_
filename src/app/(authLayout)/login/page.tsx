'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import logo from "../../../assets/logo.png"

const loginUser = async ({ id, password }: { id: string; password: string }) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', {
    id,
    password,
  });
  return response.data;
};

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { mutate, isPending, error }: any = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token); // Adjust based on your API response
      localStorage.setItem('user', JSON.stringify(data.user)); // Optional
      router.push('/'); // Change route as needed
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-xl shadow-lg flex w-full max-w-4xl border border-green-500 overflow-hidden">
        {/* Left side - Branding */}
        <div className="w-1/2 bg-black text-white p-8 flex flex-col justify-center items-center">
        <div className='bg-white rounded-full'>

          <Image src={logo} alt="লোগো" width={80} height={80} />
        </div>
          <h1 className="text-4xl font-bold text-center text-green-500 mb-2 mt-2">হযরত ফাতেমা রাঃ মহিলা মাদ্রাসা</h1>
          <p className="text-center text-sm">লগইন করে আপনার তথ্য দেখতে পারেন</p>
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-black mb-6">লগইন করুন</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-black font-semibold">
                আইডি নম্বর
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-black font-semibold">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">
                {(error.response?.data?.message as string) || 'লগইন ব্যর্থ হয়েছে।'}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF0000] text-white font-semibold py-2 rounded hover:bg-red-700 transition"
            >
              {isPending ? 'লগইন হচ্ছে...' : 'লগইন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
