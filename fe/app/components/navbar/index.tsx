'use client';

import React from 'react';
import Link from 'next/link';
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

  const router = useRouter();

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
    // window.alert(`当前时间戳：${Date.now()}`);
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center flex-shrink-0 mr-4 text-white">
          <Link href="/" className="mr-3">
            <img src="/logo.svg" className="w-10 h-10" alt="logo" />
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href="/"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                首页
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                资讯
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                产品
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                文档
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                博客
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/tools"
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                工具箱
              </Link>
              <ul className="absolute hidden group-hover:block top-full w-20 text-sm bg-gray-800 text-white p-2 space-y-2 rounded-md">
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
                      // window.alert(`当前时间戳：${Date.now()}`);
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
                className="text-white hover:bg-gray-700 transition duration-300 px-3 py-2 rounded-md"
              >
                关于我们
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center ml-auto md:flex hidden gap-5">
          <button
            className="px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
            onClick={() => {
              router.push("/register");
            }}
          >
            注册
          </button>
          <button
            className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            onClick={() => {
              router.push("/login");
            }}
          >
            登录
          </button>
          <button className="px-3 py-2 rounded-md bg-gray-800 transition duration-300 hover:bg-gray-700">
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
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;