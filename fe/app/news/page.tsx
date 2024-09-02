"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import IndexTracker from '../components/indextracker';

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "量子计算取得重大突破",
    summary: "科学家在量子计算领域取得重大进展，为更强大的计算机铺平道路。",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    category: "科技",
  },
  {
    id: 2,
    title: "全球气候峰会达成协议",
    summary: "世界领导人在最新的国际峰会上就雄心勃勃的气候目标达成共识。",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    category: "环境",
  },
  {
    id: 3,
    title: "革命性AI模型通过图灵测试",
    summary: "一个新的人工智能模型成功通过图灵测试，引发对AI未来的思考。",
    category: "人工智能",image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "太空旅游首次平民任务启动",
    summary: "首个全平民太空任务成功发射，标志着太空探索和旅游的新时代。",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "太空",
  },
  {
    id: 5,
    title: "可再生能源存储技术突破",
    summary: "研究人员开发出新的可再生能源存储方法，有望解决间歇性问题。",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "能源",
  },
  {
    id: 6,
    title: "全球经济论坛关注不平等问题",
    summary: "世界经济领袖齐聚一堂，讨论减少全球财富不平等的策略。",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    category: "经济",
  },
  {
    id: 7,
    title: "新型癌症治疗方法显示出积极结果",
    summary: "一种新颖的免疫疗法在早期临床试验中表现出显著成效。",
    image: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "健康",
  },
  {
    id: 8,
    title: "大规模网络安全漏洞影响数百万用户",
    summary: "一次广泛的网络攻击危及多个平台的用户数据，引发安全担忧。",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
    category: "网络安全",
  },
]

// Article component
const Article = ({ title, summary, image, category }: { title: string, summary: string, image: string, category: string }) => (
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
        {category}
      </Badge>
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
      <p className="text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-medium">摘要：</span>{summary}
      </p>
    </div>
  </div>
)

const Home: React.FC = () => {

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsArticles.map((article) => (
          <Article key={article.id} {...article} />
        ))}
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Home;

