import React from 'react';

const Footer = () => {
  return (
    <footer className="py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <Section title="关于我们">
          <ul>
            <ListLink href="/about" text="公司简介" />
            <ListLink href="/news" text="行业新闻" />
          </ul>
        </Section>
        <Section title="相关资源">
          <ul>
            <ListLink href="/" text="公司首页" />
            <ListLink href="/tools" text="企业工具" />
          </ul>
        </Section>
        <Section title="合作伙伴">
          <ul>
            <ListLink href="https://www.baidu.com" text="友情链接" />
          </ul>
        </Section>
        <Section title="联系信息">
          <ul>
            <ListLink href="/products" text="联系我们" />
          </ul>
        </Section>
      </div>
      <div className="mt-16 border-t border-gray-300 pt-8">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h1 className="text-lg font-medium tracking-wide text-gray-500">{title}</h1>
        {children}
    </div>
);

const ListLink = ({ href, text }: { href: string; text: string }) => (
    <li>
      <a href={href} className="text-base text-gray-500 hover:text-gray-900">
        {text}
      </a>
    </li>
);

export default Footer;