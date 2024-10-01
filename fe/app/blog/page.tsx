"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../utils/dayjs-config';
import supabase from '../supabase-client';
import dayjs from 'dayjs';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  image_url: string | null;
  category: string | null;
  tags: string[];
  status: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
}
// TODO: 分页展示
const Home: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      await checkLoginStatus();
      await fetchPosts();
      setIsLoading(false);
    };

    initializePage();
  }, []);

  const checkLoginStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://api.ai-group.top/blogs');
      const { data, error } = await response.json();
      
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert('请先登录');
      return;
    }

    const slug = title.toLowerCase().replace(/ /g, '-');
    const tagsArray = tags.split(',').map(tag => tag.trim());

    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title,
        slug,
        content,
        excerpt: excerpt || null,
        author: user.email,
        image_url: imageUrl || null,
        category: category || null,
        tags: tagsArray,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        view_count: 0,
        like_count: 0
      })
      .select();

    if (error) {
      console.error('Error inserting post:', error);
      alert('发布失败，请重试');
    } else {
      alert('发布成功！');
      setTitle('');
      setContent('');
      setExcerpt('');
      setImageUrl('');
      setCategory('');
      setTags('');
      fetchPosts();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>博客 | 我的应用</title>
        <meta name="description" content="欢迎发布" />
      </Head>
      <Navbar />
      {isLoading ? (
        <main className="flex-grow container mx-auto px-4 py-8 md:flex-row mt-20 max-w-3xl">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      ) : (
        <main className="flex-grow container mx-auto px-4 py-8 md:flex-row mt-20 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-center">最新发布</h2>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="标题"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="正文"
                className="w-full p-2 mb-4 border rounded"
                rows={4}
                required
              />
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="摘要"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="图片URL"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="分类"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="标签（用逗号分隔）"
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  发布
                </button>
              </div>
            </form>
          ) : (
            <p className="mb-8 text-gray-600 text-center">(登录账号即可发布)</p>
          )}
          <div>
            {posts.map((post) => (
              <div key={post.id} className="mb-6 p-4 border rounded">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-600 text-sm">
                  {post.author} - {dayjs(post.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </p>
                {post.image_url && (
                  <div className="flex justify-center mt-2">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={300}
                      height={200}
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
                <div className="mt-2 whitespace-pre-wrap">{post.content}</div>
                <p className="mt-2 text-sm text-gray-500">
                  分类: {post.category || '未分类'} | 
                  标签: {post.tags.join(', ') || '无标签'} | 
                  浏览: {post.view_count} | 
                  点赞: {post.like_count}
                </p>
              </div>
            ))}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Home;
