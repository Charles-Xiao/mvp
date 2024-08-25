'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image"
import { toast } from "sonner"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRouter } from 'next/navigation';

dayjs.extend(utc);
dayjs.extend(timezone);

interface NavbarProps {
  // 在这里定义 Navbar 组件需要的属性
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showCurrentTime = () => {
    const unixTime = dayjs().unix();
    const cstTime = dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    toast("当前时间", {
      description: (
        <div>
          <div>{`unixTime: ${unixTime}`}</div>
          <div>{`cstTime: ${cstTime}`}</div>
        </div>
      ),
      action: {
        label: "close",
        onClick: () => console.log("close"),
      },
    })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center flex-shrink-0 mr-4 text-white">
          <Link href="/" className="mr-3">
            <Image src="/logo.svg" className="w-10 h-10" alt="logo" />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                href="/"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                首页
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                资讯
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                产品
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                文档
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                博客
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/tools"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                工具箱
              </Link>
              <ul className="absolute hidden group-hover:block top-full w-20 text-sm bg-gray-800 text-white p-2 space-y-2 rounded-md md:hidden">
                <li className="truncate text-center">
                  <button
                    type="button"
                    className="block truncate w-full px-1 py-1 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={() => {
                      showCurrentTime();
                    }}
                  >
                    时间戳
                  </button>
                </li>
                <li className="truncate text-center">
                  <button
                    type="button"
                    className="block truncate w-full px-1 py-1 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={() => {
                      toast("网页二维码", {
                        description: "敬请期待！",
                        action: {
                          label: "close",
                          onClick: () => console.log("close"),
                        },
                      })
                    }}
                  >
                    二维码
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md block"
              >
                关于我们
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center ml-auto gap-5">
          <button
            className="px-2 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
            onClick={() => {
              router.push("/register");
            }}
          >
            注册
          </button>
          <button
            className="px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            onClick={() => {
              router.push("/login");
            }}
          >
            登录
          </button>
          <button className="px-2 py-1 rounded-md bg-gray-800 transition duration-300 hover:bg-gray-700"
            onClick={() => {
              const root = document.documentElement;
              if (root.classList.contains("dark")) {
                root.classList.remove("dark");
                root.style.setProperty("--background", "var(--background-light)");
                root.style.setProperty("--foreground", "var(--foreground-light)");
              } else {
                root.classList.add("dark");
                root.style.setProperty("--background", "var(--background-dark)");
                root.style.setProperty("--foreground", "var(--foreground-dark)");
              }
            }} >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
