"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import IndexTracker from '../components/IndexTracker';

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const imageUrls = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1726931598787-00b60840177c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1726243204979-f5d58966aaa2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1726915257451-a14bd105ca55?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727324735243-de8c0997c169?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1727507264931-19d41e653a44?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1727229900027-82129b3f8af2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727463995295-3505cb692ebb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727331000865-b5085a18463b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1726473039977-845a26101d7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1719937051176-9b98352a6cf4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1727501607287-e751b43f6f99?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D",
];

let availableImageUrls = [...imageUrls];

const getRandomImageUrl = (index: number) => {
  if (availableImageUrls.length === 0) {
    availableImageUrls = [...imageUrls];
  }
  const randomIndex = Math.floor(Math.random() * availableImageUrls.length);
  const selectedUrl = availableImageUrls[randomIndex];
  availableImageUrls.splice(randomIndex, 1);
  return selectedUrl;
};

// Article component
const Article = ({ title, hot, url, image }: { title: string, hot: string, url: string, image: string }) => (
  <div className="relative group overflow-hidden rounded-lg shadow-md">
    <Image
      src={image}
      alt={title}
      width={400}
      height={300}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
      <Badge className="self-start mb-2 bg-primary text-primary-foreground">
        {hot}
      </Badge>
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:underline">
        阅读更多
      </a>
    </div>
  </div>
)

const Home: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // https://api.vvhan.com/
        const [pengPaiResponse, huXiuResponse] = await Promise.all([
          fetch('https://api.vvhan.com/api/hotlist/pengPai'),
          fetch('https://api.vvhan.com/api/hotlist/itNews')
        ]);
        
        const pengPaiData = await pengPaiResponse.json();
        const huXiuData = await huXiuResponse.json();
        
        let combinedArticles: any[] = [];
        
        if (Array.isArray(pengPaiData.data)) {
          combinedArticles = [...combinedArticles, ...pengPaiData.data];
        }
        
        if (Array.isArray(huXiuData.data)) {
          combinedArticles = [...combinedArticles, ...huXiuData.data];
        }
        
        if (combinedArticles.length > 0) {
          const processedArticles = combinedArticles
            .slice(0, 32)
            .map((article: any, index: number) => ({
              ...article,
              image: getRandomImageUrl(index)
            }));
          setNewsArticles(processedArticles as any);
        } else {
          console.error('No valid data received from APIs');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="This is my page description" />
      </Head>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mt-24 mb-8 text-center">最新资讯</h1>
        <div className="container mx-auto px-4 py-8">
          <IndexTracker />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsArticles.map((article: any) => (
              <Article key={article.url} {...article} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
