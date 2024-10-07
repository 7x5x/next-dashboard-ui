"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OrderByDayProps } from "@/types/OrderByDayProps";

// Example daily data with date
const data = [
  { date: "2024-09-20", income: 400, expense: 240 },
  { date: "2024-09-21", income: 300, expense: 139 },
  { date: "2024-09-22", income: 200, expense: 980 },
  { date: "2024-09-23", income: 278, expense: 390 },
  { date: "2024-09-24", income: 189, expense: 480 },
  { date: "2024-09-25", income: 239, expense: 380 },
  { date: "2024-09-26", income: 349, expense: 430 },
  { date: "2024-09-27", income: 420, expense: 310 },
  { date: "2024-09-28", income: 490, expense: 410 },
  { date: "2024-09-29", income: 350, expense: 230 },
  { date: "2024-09-30", income: 380, expense: 480 },
  { date: "2024-10-01", income: 400, expense: 490 },
  { date: "2024-10-02", income: 420, expense: 510 },
  { date: "2024-10-03", income: 450, expense: 540 },
  { date: "2024-10-04", income: 470, expense: 560 },
];



const FinanceChart = ({ data }: OrderByDayProps) => {
  const [startDate, setStartDate] = useState("2024-09-20");
  const [endDate, setEndDate] = useState("2024-10-01");

  // Function to filter data based on selected date range
  const getFilteredData = () => {
    return data.filter(({ date }) => date >= startDate && date <= endDate);
  };

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Paid Impressions</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Date Range Picker */}
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-lg px-2 py-1"
        />
        <span>to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-lg px-2 py-1"
        />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={getFilteredData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
