"use client"

import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {LoginForm} from '../components/login';
import '../utils/dayjs-config';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>登录 | 我的应用</title>
        <meta name="description" content="欢迎登录我的应用，请输入您的账号和密码" />
        <meta name="keywords" content="登录,账号,密码,我的应用" />
        <meta name="author" content="我的应用团队" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ai-group.top/login" />
        <meta property="og:title" content="登录 | 我的应用" />
        <meta property="og:description" content="欢迎登录我的应用，请输入您的账号和密码" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-group.top/login" />
      </Head>
      <Navbar /> 
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Home;
