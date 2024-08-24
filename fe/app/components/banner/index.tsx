import React from 'react';

interface BannerProps {
  // 在这里定义 Banner 组件需要的属性
}

const Banner: React.FC<BannerProps> = () => {
  return (
    <div className="banner mt-14" style={{
      backgroundImage: `url('./banner-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
        欢迎来到我们的网站
      </h1>
      <p className="mt-3 text-xl font-medium text-white lg:text-2xl">
        探索我们的产品和服务
      </p>
      <div className="mt-6">
        <button className="px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition duration-300">
          更多内容
        </button>
      </div>
    </div>
  );
};

export default Banner;