"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import CalculatorComponent from '../components/calculator'; 
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Toaster } from "@/components/ui/sonner";
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Buffer } from 'buffer';
import { GlobeEarth } from '../components/globeEarth';
import DateProgressor from '../components/DateProgressor';

dayjs.tz.setDefault('Asia/Shanghai');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('zh-cn');

const Home: React.FC = () => {
  const [unixInputValue, setUnixInputValue] = useState('');
  const [currentTime, setcurrentTime] = useState('');
  const [cstInputValue, setCstInputValue] = useState('');
  const [encodedString, setEncodedString] = useState('');
  const [decodedString, setDecodedString] = useState('');
  const [urlencodedString, setUrlEncodedString] = useState('');
  const [urldecodedString, setUrlDecodedString] = useState('');
  const [hexencodedString, setHexEncodedString] = useState('');
  const [hexdecodedString, setHexDecodedString] = useState('');
  const [ip, setIp] = useState('');
  const [ipResult, setIpResult] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [dateDiff, setDateDiff] = useState('');

  const currentCstDate = dayjs().format('YYYY-MM-DD');
  const currentUnixTime = dayjs().unix().toString();

  const unixts2cst = () => {
    const unixTime = unixInputValue ? Number(unixInputValue) : Number(currentUnixTime);
    const cstTime = dayjs.unix(unixTime).format('YYYY-MM-DD HH:mm:ss');
    console.log(cstTime);
    setCstInputValue(cstTime);
  }

  const cstts2unix = () => {
    const cstTime = cstInputValue;
    const unixTime = dayjs.tz(cstTime).valueOf() / 1000;
    console.log(unixTime);
    setUnixInputValue(unixTime.toString());
  }

  const base64 = {
    encode: (str: string) => Buffer.from(str).toString('base64'),
    decode: (base64Str: string) => Buffer.from(base64Str, 'base64').toString('utf-8'),
  };

  const hex = {
    encode: (str: string) => Buffer.from(str, 'utf-8').toString('hex'),
    decode: (hexStr: string) => Buffer.from(hexStr, 'hex').toString('utf-8'),
  };

  const showDaysDifff = () => {
      const now = dayjs();
      const date = inputDate ? dayjs(inputDate) : dayjs(currentCstDate);
      const days = now.diff(date, 'day');
      setDateDiff(String(days));
  }

  const [ipAddress, setIpAddress] = useState<string>('');
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
      setIpAddress('');
    }
  };
  getIpAddress();

  const getGeoIp = async () => {
    try {
      // const res = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
      const res = await fetch(`https://api.ip.sb/geoip/${ip}`);
      const result = await res.json();
      // setIpResult(`${result.country} ${result.regionName} ${result.city} ${result.isp}`);
      const country = result.country ? result.country : '';
      const region = result.region ? `, ${result.region}` : '';
      const city = result.city ? `, ${result.city}` : '';
      const isp = result.isp ? `, ${result.isp}` : '';
      setIpResult(`${country}${region}${city}${isp}`);
    } catch (error) {
      console.error(error);
      setIpResult('查询IP失败');
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>在线工具箱 - 时间转换、编码解码、IP查询等实用工具</title>
        <meta name="description" content="免费在线工具箱，提供Unix时间戳转换、Base64编码解码、URL编码解码、Hex编码解码、IP地址查询、日期计算等多种实用工具。轻松高效完成各种日常任务。" />
        <meta name="keywords" content="在线工具,时间转换,Base64,URL编码,Hex编码,IP查询,日期计算,实用工具" />
        <meta name="author" content="ai-group" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://ai-group.top/tools" />
      </Head>
      <Navbar />
      <Toaster />
      <div className="flex items-center mt-20 justify-center gap-0.5 mb-2">
        <DateProgressor />
      </div>
      <div className="flex items-center mt-10 justify-center gap-0.5 mb-2">
        <GlobeEarth />
      </div>
      
      <div className="flex mx-auto mt-12 items-center justify-center">
        <Label className="mb-4 text-1.5xl">计算器</Label>
      </div>
      <div className="flex items-center justify-center gap-0.5 mb-2">
        <CalculatorComponent />
      </div>

      <div className="container mx-auto p-2 mt-12 flex flex-wrap gap-20 items-center justify-center">
        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">当前Unix时间戳</Label>
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              id="input-unix-time"
              className="flex-grow"
              value={currentTime}
              onChange={e => {
                setcurrentTime(e.target.value);
              }}
              placeholder={currentUnixTime}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <Button
              onClick={() => {
                setcurrentTime(String(Math.floor(Date.now() / 1000)));
              }}
              className="flex-grow"
            >
              点击获取
            </Button>
          </div>
        </div>

        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">Unix时间戳 -- CST时间</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-unix-time"
              className="flex-grow"
              value={unixInputValue}
              placeholder={currentUnixTime}
              onChange={e => setUnixInputValue(e.target.value)}
            />
            <div className="w-2" />
            <Input
              id="input-cst-time"
              className="flex-grow"
              value={cstInputValue}
              onChange={e => setCstInputValue(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={unixts2cst} className="flex-grow">
              Unix时间转CST
            </Button>
            <Button onClick={cstts2unix} className="flex-grow">
              CST时间转Unix
            </Button>
          </div>
        </div>

        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">日期距今的天数</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-ip-query"
              className="flex-grow"
              value={inputDate}
              onChange={e => setInputDate(e.target.value)}
              placeholder={currentCstDate}
            />
            <div className="w-2" />
            <Input
              id="input-ip-query-result"
              className="flex-grow"
              value={dateDiff}
              readOnly
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={showDaysDifff} className="flex-grow">
              点击查询
            </Button>
          </div>
        </div>

        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">Base64编码/解码</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-6base4-encode"
              className="flex-grow"
              value={encodedString}
              onChange={e => setEncodedString(e.target.value)}
            />
            <div className="w-2" />
            <Input
              id="input-6base4-decode"
              className="flex-grow"
              value={decodedString}
              onChange={e => setDecodedString(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={() => setDecodedString(base64.encode(encodedString))} className="flex-grow">
              编码
            </Button>
            <Button onClick={() => setEncodedString(base64.decode(decodedString))} className="flex-grow">
              解码
            </Button>
          </div>
        </div>

        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">UrlEncode编码/解码</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-urlencode-decode"
              className="flex-grow"
              value={urldecodedString}
              onChange={e => setUrlDecodedString(e.target.value)}
            />
            <div className="w-2" />
            <Input
              id="input-urlencode-encode"
              className="flex-grow"
              value={urlencodedString}
              onChange={e => setUrlEncodedString(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={() => setUrlEncodedString(encodeURIComponent(urldecodedString))} className="flex-grow">
              编码
            </Button>
            <Button onClick={() => setUrlDecodedString(decodeURIComponent(urlencodedString))} className="flex-grow">
              解码
            </Button>
          </div>
        </div>
        
        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">Hex编码/解码</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-urlencode-decode"
              className="flex-grow"
              value={hexdecodedString}
              onChange={e => setHexDecodedString(e.target.value)}
            />
            <div className="w-2" />
            <Input
              id="input-urlencode-encode"
              className="flex-grow"
              value={hexencodedString}
              onChange={e => setHexEncodedString(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={() => setHexEncodedString(hex.encode(hexdecodedString))} className="flex-grow">
              编码
            </Button>
            <Button onClick={() => setHexDecodedString(hex.encode(hexencodedString))} className="flex-grow">
              解码
            </Button>
          </div>
        </div>

        <div className="w-3/10" >
          <div className="flex items-center justify-center">
            <Label className="mb-2">IP归属地查询</Label>
          </div>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <Input
              id="input-ip-query"
              className="flex-grow"
              value={ip}
              onChange={e => setIp(e.target.value)}
              placeholder={ipAddress}
            />
            <div className="w-2" />
            <Input
              id="input-ip-query-result"
              className="flex-grow"
              value={ipResult}
              readOnly
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button onClick={getGeoIp} className="flex-grow">
              点击查询
            </Button>
          </div>
        </div>


      </div>
      
      {/* <SwiperComponent /> */}
      <Footer />
    </div>
  );
};

export default Home;