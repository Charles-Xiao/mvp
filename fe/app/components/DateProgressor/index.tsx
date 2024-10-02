import React, { useState, useEffect } from 'react';
import GaugeChart from "@/components/animata/graphs/gauge-chart";

const DateProgressor: React.FC = () => {
  const [progress, setProgress] = useState({ day: 0, week: 0, month: 0, year: 0 });

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      const dayProgress = Number(((now.getHours() * 60 + now.getMinutes()) / (24 * 60) * 100).toFixed(1));
      const weekProgress = Number((((now.getDay() * 24 + now.getHours()) * 60 + now.getMinutes()) / (7 * 24 * 60) * 100).toFixed(1));
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const monthProgress = Number((((now.getDate() - 1) * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (daysInMonth * 24 * 60) * 100).toFixed(1));
      const yearProgress = Number((((now.getTime() - startOfYear.getTime()) / (365 * 24 * 60 * 60 * 1000)) * 100).toFixed(1));

      setProgress({
        day: dayProgress,
        week: weekProgress,
        month: monthProgress,
        year: yearProgress
      });
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">光阴似箭，白驹过隙</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="text-base font-medium text-muted-foreground text-center">日进度</div>
          </div>
          <GaugeChart
            circleWidth={10}
            gap={100}
            progress={progress.day}
            progressWidth={10}
            rounded
            showValue
            size={100}
            progressClassName="text-blue-500"
          />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="text-base font-medium text-muted-foreground text-center">周进度</div>
          </div>
          <GaugeChart
            circleWidth={10}
            gap={100}
            progress={progress.week}
            progressWidth={10}
            rounded
            showValue
            size={100}
            progressClassName="text-green-500"
          />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="text-base font-medium text-muted-foreground text-center">月进度</div>
          </div>
          <GaugeChart
            circleWidth={10}
            gap={100}
            progress={progress.month}
            progressWidth={10}
            rounded
            showValue
            size={100}
            progressClassName="text-yellow-500"
          />
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="text-base font-medium text-muted-foreground text-center">年进度</div>
          </div>
          <GaugeChart
            circleWidth={10}
            gap={100}
            progress={progress.year}
            progressWidth={10}
            rounded
            showValue
            size={100}
            progressClassName="text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DateProgressor;
