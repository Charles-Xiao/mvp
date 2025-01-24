import React from 'react';
import Head from 'next/head';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Footer from './components/footer';
import SwiperComponent from './components/swiper';
import { Toaster } from "@/components/ui/sonner"
import PlyrVideo from './components/plyrVideo';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="This is my page description" />
      </Head>
      <Navbar />
      <Toaster />
      <Banner />
      <SwiperComponent />
      <PlyrVideo />
      <Footer />
    </div>
  );
};

export default Home;