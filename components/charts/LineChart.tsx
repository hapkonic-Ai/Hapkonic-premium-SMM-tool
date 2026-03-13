"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data: DataPoint[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const LineChart = ({
  data,
  index,
  categories,
  colors = ["#00F0FF", "#A855F7", "#EC4899", "#10B981"],
  valueFormatter = (value: number) => value.toString(),
  className,
}: LineChartProps) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {categories.map((category, i) => (
              <linearGradient key={category} id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
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
            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
          />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: colors[i % colors.length] }}
              animationDuration={1500}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
