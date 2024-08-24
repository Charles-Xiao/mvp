import React from 'react';

const Footer = () => {
  return (
    <footer className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <Section title="关于我们">
          <ul>
            <ListLink href="#" text="公司简介" />
            <ListLink href="#" text="联系我们" />
          </ul>
        </Section>
        <Section title="相关资源">
          <ul>
            <ListLink href="#" text="首页" />
            <ListLink href="#" text="产品" />
            <ListLink href="#" text="服务" />
          </ul>
        </Section>
        <Section title="合作伙伴">
          <ul>
            <ListLink href="#" text="合作伙伴" />
          </ul>
        </Section>
        <Section title="联系信息">
          <ul>
            <ListLink href="#" text="联系我们" />
          </ul>
        </Section>
      </div>
      <div className="mt-16 border-t border-gray-200 pt-8 text-center">
        <p className="text-base text-gray-400">
          © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
        <h1 className="text-base font-medium tracking-wide text-gray-500">{title}</h1>
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