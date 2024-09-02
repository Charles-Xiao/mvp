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
      </Head>
      <Navbar /> 
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Home;
