"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DataPoint[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  showLabels?: boolean;
}

export const DonutChart = ({
  data,
  colors = ["#00F0FF", "#A855F7", "#EC4899", "#10B981", "#F97316"],
  valueFormatter = (value: number) => value.toString(),
  className,
  showLabels = false,
}: DonutChartProps) => {
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={cn("h-full w-full relative", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Total</span>
        <span className="text-2xl font-black text-white">{valueFormatter(totalValue)}</span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="85%"
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                stroke="none"
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(10, 10, 26, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
              fontSize: "12px",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            iconType="circle"
            wrapperStyle={{ paddingTop: "20px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
