"use client";

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"

const Article = () => {
  type SidebarLink = { id: number; href: string; text: string };
  type SidebarSection = { id: number; title: string; links: SidebarLink[] };
  const [sidebarData, setSidebarData] = useState<SidebarSection[]>([]); // Specify type for sidebarData

  const [articles, setArticles] = useState<{ id: string; title: string; subtitle: string; content: string; created_at: string; section: string }[]>([]); // Specify type for articles
  const [selectedArticle, setSelectedArticle] = useState<{ id: string; title: string; subtitle: string; content: string; created_at: string; section: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.ai-group.top/articles');
        const { data } = await response.json();

        if (data) {
          setArticles(data);
          setSelectedArticle(data[0]);
          // Generate sidebar data based on unique sections from articles
          const uniqueSections = Array.from(new Set(data.map((article: { section: string }) => article.section)));
          const sidebarData = uniqueSections.map((section, index) => {
            const sectionArticles = data.filter((article: { section: string }) => article.section === section);
            const links = sectionArticles.map((article: { id: string, title: string }, linkIndex: number) => ({
              id: linkIndex + 1,
              href: `#${article.id}`,
              text: article.title
            }));
            return {
              id: index + 1,
              title: section,
              links: links
            };
          });
          setSidebarData(sidebarData as SidebarSection[]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, []);
  
  return (
    <div className="flex flex-col md:flex-row mt-20">
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <aside className="w-full md:w-64 p-4 border-r md:border-r-0 flex-shrink-0">
            <div className="mb-4">
              <Input type="search" placeholder="Search" className="w-full" />
            </div>
            <nav className="space-y-2">
              {sidebarData && sidebarData.map((section: SidebarSection) => (
                <React.Fragment key={section.id}>
                  <h2 className="text-lg font-bold">{section.title}</h2>
                  <ul className="space-y-1">
                    {section.links.map((link: SidebarLink) => (
                      <li key={link.id}>
                        <a href={link.href} className="block text-muted-foreground" onClick={(e) => {
                          e.preventDefault();
                          
                          const articleId = link.href.split('#')[1];
                          const selectedArticle = articles.find(article => article.id === articleId);
                          if (selectedArticle) {
                            // Directly update the state to trigger a re-render with the selected article's content
                            setSelectedArticle(selectedArticle);
                          }
                        }}>
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </nav>
          </aside>
            
          <div className="mb-4 ml-4 mt-4 md:ml-0">
            {selectedArticle ? ( // Check if articles array is not empty
                <>
                    <h1 id="article-title" className="text-2xl font-bold">{selectedArticle.title}</h1>
                    <h2 id="article-subtitle" className="mt-8 text-xl font-semibold">{selectedArticle.subtitle}</h2>
                    <div id="article-content" className="mt-4" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}></div>
                </>
            ) : (
                <p></p> // Fallback message
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Article;