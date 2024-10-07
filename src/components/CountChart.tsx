"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 2000,
    fill: "white",
  },
  {
    name: "FEMALE",
    count: 653,
    fill: "#FAE27C",
  },
  {
    name: "MALE",
    count: 1347,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  // Calculate percentages
  const totalCount = data[0].count; // Total count from data
  const maleCount = data[2].count; // Male count from data
  const femaleCount = data[1].count; // Female count from data

  const malePercentage = ((maleCount / totalCount) * 100).toFixed(0); // Male percentage
  const femalePercentage = ((femaleCount / totalCount) * 100).toFixed(0); // Female percentage

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          PAID IMPRESSIONS BY{" "}
          <span className=" text-gray-300 font-normal">/ Gender</span>
        </h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{maleCount}</h1>
          <h2 className="text-xs text-gray-300">MALE ({malePercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{femaleCount}</h1>
          <h2 className="text-xs text-gray-300">
            FEMALE ({femalePercentage}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
