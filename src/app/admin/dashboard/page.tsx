import Announcements from "@/components/Announcements";
import ClikeRateChart from "@/components/AttendanceChart";
import { ChartCard } from "@/components/ChartCard";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import { PaidImpressionsChart } from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { PaidImpressionsProps } from "@/types/OrderByDayProps";
const data: PaidImpressionsProps[] = [
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

const gendeDdata = [
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

const clikeRateChartData = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];
const AdminPage = () => {
  const totalSalesRangeOption = RANGE_OPTIONS.last_7_days;
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:full  flex flex-col gap-8">
        {/* USER CARDS */}

        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart data={gendeDdata} />
          </div>

          <div className="w-full lg:w-2/3 h-[450px]">
            <ClikeRateChart data={clikeRateChartData} />
          </div>
        </div>

        <ChartCard
          title="Paid Impressions"
          queryKey="totalSalesRange"
          selectedRangeLabel={totalSalesRangeOption.label}
        >
          <div className="w-full h-[500px]">
            <PaidImpressionsChart data={data} />
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminPage;
