"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {RegisterForm} from '../components/register';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('zh-cn');

const Home: React.FC = () => {

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="This is my page description" />
      </Head>
      <Navbar />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Home;