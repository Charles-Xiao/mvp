"use client"
import React, { useEffect, useState } from 'react';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Dot, Line, LineChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with dots and colors"

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function IndexTracker() {

    const [btcIndex, setBtcIndex] = useState<number | null>(null);
    const [ethIndex, setEthIndex] = useState<number | null>(null); // 新增 ETH 状态
    const [error, setError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<{ date: string; BTC: number; color: string; }[]>([]); // 定义 chartData 的类型
    const [ahr999Data, setAhr999Data] = useState<{ date: string; ahr999: number; color: string; }[]>([]);
    const calculateBTCIndex = async () => {
        try {
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
        if (!response.ok) {
            throw new Error('网络错误');
        }
        const data = await response.json();
        setBtcIndex(data.USD);
        setError(null);
        } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('未知错误');
        }
        }
    };
    const calculateETHIndex = async () => { // 新增获取 ETH 的函数
        try {
          const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'); // 替换为实际 ETH API
          if (!response.ok) {
            throw new Error('网络错误');
          }
          const data = await response.json();
          setEthIndex(data.USD);
          setError(null);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('未知错误');
          }
        }
      };
    const fetchChartData = async () => {
        try {
            // https://api.coinbase.com/v2/prices/BTC-USD/spot
            // https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD
            // https://publicapis.io/coin-desk-api
            const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
            if (!response.ok) {
                throw new Error('网络错误');
            }
            const data = await response.json();
            const formattedData = Object.entries(data.bpi).map(([date, value], index) => ({
                date,
                BTC: Number(value),
                // Using a different color for each dot based on the index
                color: `hsl(${(index % 360) % 360}, 100%, 60%)`,
            }));
            setChartData(formattedData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('未知错误');
            }
        }
    };
    const fetchAhr999Data = async () => { // 新增获取 AHR999 的函数
        try {
            const response = await fetch('https://coinank.com/indicatorapi/getAhr999Table');
            if (!response.ok) {
                throw new Error('网络错误');
            }
            const data = await response.json();
            // Reverse the order of the data before formatting
            const reversedData = data.data.reverse();
            const formattedData = reversedData.map((item: { date: string; ahr999: number }, index: number) => ({ 
                date: new Date(item.date).toISOString().split('T')[0],
                ahr999: item.ahr999,
                // Using a different color for each dot based on the index
                color: `hsl(${(index % 360) % 360}, 100%, 60%)`,
            }));
            setAhr999Data(formattedData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('未知错误');
            }
        }
    };
    useEffect(() => {
        calculateBTCIndex();
        calculateETHIndex(); // 初始计算 ETH
        fetchChartData(); // 初始获取图表数据
        fetchAhr999Data(); // 初始获取 AHR999 数据
        const interval = setInterval(() => {
          calculateBTCIndex();
          calculateETHIndex(); 
          fetchChartData();
          fetchAhr999Data(); // 初始获取 AHR999 数据
        }, 30000);
        return () => clearInterval(interval);
      }, []);

  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="flex-1 text-center md:flex-1/2">
        <div className="font-bold text-3xl mb-4">BTC实时价格</div>
        <div className="text-3xl font-bold text-blue-500 mb-8">{btcIndex !== null ? `$${btcIndex.toFixed(0)}` : ''}</div>
      </div>
      <Card style={{ width: '400px', margin: '20px 10px' }}> {/* Adjusted card width for more space and added margin for mobile */}
        <CardHeader className="text-center">
          <CardTitle>BTC 30天历史价格</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 24,
                left: 24,
                right: 24,
                bottom: 24
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="Bitcoin"
                    hideLabel
                  />
                }
              />
              <Line
                dataKey="BTC"
                type="natural"
                stroke="var(--color-visitors)"
                strokeWidth={2}
                dot={({ payload, ...props }) => {
                  return (
                    <Dot
                      key={payload.date}
                      r={5}
                      cx={props.cx}
                      cy={props.cy}
                      // Adjusted to use the color from the data
                      fill={payload.color}
                      stroke={payload.color}
                    />
                  )
                }}
               />
            </LineChart>

          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-end gap-2 text-sm">
          {/* <div className="flex gap-2 font-medium leading-none">
          </div> */}
          <div className="leading-none text-muted-foreground">
          图表数据仅供参考 不构成投资建议
          </div>
        </CardFooter>
      </Card>
      <Card style={{ width: '400px', margin: '20px 10px' }}> {/* Adjusted card width for more space and added margin for mobile */}
        <CardHeader className="text-center">
          <CardTitle>BTC ahr999囤币指数</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={ahr999Data}
              margin={{
                top: 24,
                left: 24,
                right: 24,
                bottom: 24
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="Bitcoin"
                    hideLabel
                  />
                }
              />
              <Line
                dataKey="ahr999"
                type="natural"
                stroke="var(--color-visitors)"
                strokeWidth={2}
                dot={({ payload, ...props }) => {
                  return (
                    <Dot
                      key={payload.date}
                      r={5}
                      cx={props.cx}
                      cy={props.cy}
                      // Adjusted to use the color from the data
                      fill={payload.color}
                      stroke={payload.color}
                    />
                  )
                }}
               />
            </LineChart>

          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-end gap-2 text-sm">
          {/* <div className="flex gap-2 font-medium leading-none">
          </div> */}
          <div className="leading-none text-muted-foreground">
          图表数据仅供参考 不构成投资建议
          </div>
        </CardFooter>
      </Card>
      <div className="flex-1 text-center md:flex-1/2">
        <div className="font-bold text-3xl mb-4">ETH实时价格</div>
        <div className="text-3xl font-bold text-green-500 mb-8">{ethIndex !== null ? `$${ethIndex.toFixed(0)}` : ''}</div>
      </div>
    </div>
  )
}
