"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  [key: string]: any;
}

interface AreaChartProps {
  data: DataPoint[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  stacked?: boolean;
}

export const AreaChart = ({
  data,
  index,
  categories,
  colors = ["#00F0FF", "#A855F7", "#EC4899", "#10B981"],
  valueFormatter = (value: number) => value.toString(),
  className,
  stacked = false,
}: AreaChartProps) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {categories.map((category, i) => (
              <linearGradient key={category} id={`area-gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
          />
          <XAxis
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(240,240,245,0.40)", fontSize: 10 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(240,240,245,0.40)", fontSize: 10 }}
            tickFormatter={valueFormatter}
          />
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
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}
          />
          {categories.map((category, i) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#area-gradient-${category})`}
              stackId={stacked ? "1" : undefined}
              animationDuration={1500}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
