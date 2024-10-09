import { IInterest } from "@/backend/modules/Interest";
import { DashboardServices } from "@/backend/services/DashboardServices";
import Announcements from "@/components/Announcements";
import ClikeRateChart from "@/components/AttendanceChart";
import { ChartCard } from "@/components/ChartCard";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import { PaidImpressionsChart } from "@/components/FinanceChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { ClikeRateProps } from "@/types/ClikeRateProps";
import { PaidImpressionsProps } from "@/types/OrderByDayProps";

const fetchData = async (totalSalesRangeOption:any) => {
  try {
    return await DashboardServices.getAllDashboardData(
      totalSalesRangeOption?.startDate,
      totalSalesRangeOption?.endDate
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

const data: PaidImpressionsProps[] = [
  { date: "2024-09-20", income: 400, expense: 240 },
  { date: "2024-10-06", income: 11, expense: 111 },
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
const AdminPage = async ({
  searchParams: { startDate, endDate },
}: {
  searchParams: { startDate: string; endDate: string };
  }) => {
   let totalSalesRangeOption;
   switch (startDate) {
     case "last_30_days":
       totalSalesRangeOption = RANGE_OPTIONS.last_30_days;
       break;
     case "last_90_days":
       totalSalesRangeOption = RANGE_OPTIONS.last_90_days;
       break;
     case "last_365_days":
       totalSalesRangeOption = RANGE_OPTIONS.last_365_days;
       break;

     default:
       totalSalesRangeOption = RANGE_OPTIONS.last_7_days;
       break;
   }
  const dashboardData = await fetchData(totalSalesRangeOption);

  // Handle potential null from fetchData
  if (!dashboardData) {
    return <div>Error loading dashboard data.</div>; // Fallback UI
  }

  const {
    vistorCount = 0,
    genderData = [], // Provide default values if undefined
    clikeRateChartData = [] as ClikeRateProps[],
    interest = [],
    formattedPaidImpressions = [] as PaidImpressionsProps[],
  } = dashboardData;

   
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:full  flex flex-col gap-8">
        {/* USER CARDS */}
        <ChartCard
          title="Filter"
          queryKey="startDate"
          selectedRangeLabel={totalSalesRangeOption.label}
        >
          <div className="w-full"></div>
        </ChartCard>
        <div className=" h-30 w-full grid grid-cols-5 gap-6">
          <InterestCard interest={interest} />
          <TotalVistorCard vistorCount={vistorCount} />
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart data={genderData} />
          </div>

          <div className="w-full lg:w-2/3 h-[450px]">
            <ClikeRateChart data={clikeRateChartData} />
          </div>
        </div>

        <div className="w-full h-[500px]">
          <PaidImpressionsChart data={formattedPaidImpressions} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

const TotalVistorCard = ({ vistorCount }: { vistorCount: number }) => {
  return (
    <Card className=" col-span-2">
      <CardHeader>
        <h1 className=" w-full text-center  font-bold text-md">Visitors</h1>
        <p className=" w-full text-center text-sm text-gray-300">avrg</p>
      </CardHeader>
      <CardContent>
        <h1 className=" w-full text-center text-lamaYellow font-semibold  text-4xl">
          {vistorCount}
        </h1>
        <p className=" w-full text-center text-sm text-gray-300">per day</p>
      </CardContent>
    </Card>
  );
};

const InterestCard = ({ interest }: { interest: IInterest[] }) => {
  return (
    <Card className=" col-span-3 ">
      <CardHeader>
        <h1 className=" w-full   font-bold text-md">
          Viwe delivery insights by :
          <span className=" text-lamaYellow ml-4 font-normal">
            I N T E R E S T
          </span>
        </h1>
      </CardHeader>
      <CardContent>
        {interest.map((item, i) => {
          return (
            <div key={i} className="flex justify-between items-center">
              <h1 className="">
                <span>{i + 1}.</span>
                {item.name}
              </h1>
              <p className="">{item.value}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
