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
        <title>用户注册 | AI Group - 智能工具和服务平台</title>
        <meta name="description" content="欢迎注册AI Group，享受智能工具、个性化服务和独家优惠。加入我们，探索AI的无限可能。" />
        <meta name="keywords" content="用户注册,AI工具,人工智能,个性化服务,AI Group" />
        <meta name="author" content="AI Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ai-group.top/register" />
        <meta property="og:title" content="用户注册 | AI Group - 智能工具和服务平台" />
        <meta property="og:description" content="欢迎注册AI Group，享受智能工具、个性化服务和独家优惠。加入我们，探索AI的无限可能。" />
        <meta property="og:url" content="https://ai-group.top/register" />
        <meta property="og:type" content="website" />
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