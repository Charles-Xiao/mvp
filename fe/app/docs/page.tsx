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
        <title>文章 | AI Group - 智能工具和服务平台</title>
        <meta name="description" content="探索AI Group的文章库，获取最新的AI技术趋势、应用案例和行业洞察。提升您的AI知识，了解人工智能如何改变我们的生活和工作。" />
        <meta name="keywords" content="AI文章,人工智能,技术趋势,应用案例,行业洞察,AI Group" />
        <meta name="author" content="AI Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ai-group.top/docs" />
        <meta property="og:title" content="文章 | AI Group - 智能工具和服务平台" />
        <meta property="og:description" content="探索AI Group的文章库，获取最新的AI技术趋势、应用案例和行业洞察。提升您的AI知识，了解人工智能如何改变我们的生活和工作。" />
        <meta property="og:url" content="https://ai-group.top/docs" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar />
      <Article /> 
      <Footer />
    </div>
  );
};

export default Home;