import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>AI Group 产品列表 | 智能工具和服务平台</title>
        <meta name="description" content="探索AI Group的创新产品列表，包括智能工具、个性化服务和尖端AI解决方案。提升效率，激发创意，体验AI的无限可能。" />
        <meta name="keywords" content="AI产品,智能工具,人工智能服务,AI Group,创新解决方案" />
        <meta name="author" content="AI Group" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ai-group.top/products" />
        <meta property="og:title" content="AI Group 产品列表 | 智能工具和服务平台" />
        <meta property="og:description" content="探索AI Group的创新产品列表，包括智能工具、个性化服务和尖端AI解决方案。提升效率，激发创意，体验AI的无限可能。" />
        <meta property="og:url" content="https://ai-group.top/products" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar /> 
      {/* 这里可以添加产品列表的具体内容 */}
      <Footer />
    </div>
  );
};

export default Home;