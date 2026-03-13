"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  [key: string]: any;
}

interface BarChartProps {
  data: DataPoint[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  layout?: "horizontal" | "vertical";
  stacked?: boolean;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ["#00F0FF", "#A855F7", "#EC4899", "#10B981"],
  valueFormatter = (value: number) => value.toString(),
  className,
  layout = "horizontal",
  stacked = false,
}: BarChartProps) => {
  return (
    <div className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{
            top: 5,
            right: 10,
            left: layout === "vertical" ? 20 : -20,
            bottom: 0,
          }}
        >
          <CartesianGrid 
            vertical={layout === "vertical"} 
            horizontal={layout === "horizontal"} 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
          />
          <XAxis
            type={layout === "vertical" ? "number" : "category"}
            dataKey={layout === "vertical" ? undefined : index}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(240,240,245,0.40)", fontSize: 10 }}
            hide={layout === "vertical"}
          />
          <YAxis
            type={layout === "vertical" ? "category" : "number"}
            dataKey={layout === "vertical" ? index : undefined}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(240,240,245,0.40)", fontSize: 10 }}
            tickFormatter={valueFormatter}
            width={layout === "vertical" ? 80 : 40}
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
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={layout === "vertical" ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              stackId={stacked ? "1" : undefined}
              animationDuration={1500}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
