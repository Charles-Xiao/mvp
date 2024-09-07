/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XXNdTbjLjsg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>产品 | 我的应用</title>
        <meta name="description" content="" />
      </Head>
      <Navbar /> 
      <Footer />
    </div>
  );
};

export default Home;