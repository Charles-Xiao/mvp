"use client"

import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { RegisterForm } from '../components/register';
import '../utils/dayjs-config';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>用户注册 | 我的网站</title>
        <meta name="description" content="欢迎注册我们的网站，享受更多个性化服务和独家优惠。" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
          <div className="max-w-md mx-auto">
            <RegisterForm />
          </div>
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;