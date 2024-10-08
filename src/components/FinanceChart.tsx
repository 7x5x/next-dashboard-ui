"use client";

import { formatCurrency } from "@/lib/utils";
import { PaidImpressionsProps } from "@/types/OrderByDayProps";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PaidImpressionsChart({ data }: {data:PaidImpressionsProps[]}) {
  const [startDate, setStartDate] = useState("2024-09-20");
  const [endDate, setEndDate] = useState("2024-10-01");

  const getFilteredData = () => {
    return data.filter(({ date }) => date >= startDate && date <= endDate);
  };
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
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
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
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
}
