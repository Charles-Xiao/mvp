import Image from "next/image"
import Link from "next/link"
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Article from '../components/article';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>文章 | 我的应用</title>
        <meta name="description" content="" />
      </Head>
      <Navbar />
      <Article /> 
      <Footer />
    </div>
  );
};

export default Home;