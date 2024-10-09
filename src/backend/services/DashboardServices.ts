// // src/services/genderDataService.ts

import ClickRate from "../modules/ClickRate";
import GenderData from "../modules/Gender";
import InterestData from "../modules/Interest";
import PaidImpressions, { IPaidImpressions } from "../modules/PaidImpressions";

// import ClickRate from "../modules/ClickRate";
// import GenderData, { IGenderData } from "../modules/Gender";
// import InterestData from "../modules/Interest";
// import PaidImpressions, { IPaidImpressions } from "../modules/PaidImpressions";

// export class DashboardServices {
//     static getAllDashboardData = async () => {
//       // Fetching data and excluding specific fields
//       const genderDataRaw = await GenderData.find().select(
//         "-_id -createdAt -updatedAt -__v"
//       );
//       const clickRate = await ClickRate.find().select(
//         "-_id -createdAt -updatedAt -__v"
//       );
//       const interest = await InterestData.find().select(
//         "-_id -createdAt -updatedAt -__v"
//       );
//       const paidImpressions = await PaidImpressions.find()
//         .select("-_id -createdAt -updatedAt -__v")
//         .sort({ date: 1 }); // 1 for ascending, -1 for descending

//       // Transforming gender data into the desired format
//       const totalMaleCount = genderDataRaw.reduce(
//         (acc, data) => acc + data.male,
//         0
//       );
//       const totalFemaleCount = genderDataRaw.reduce(
//         (acc, data) => acc + data.female,
//         0
//       );
//       const totalCount = totalMaleCount + totalFemaleCount;

//       const genderData = [
//         {
//           name: "Total",
//           count: totalCount,
//           fill: "white",
//         },
//         {
//           name: "FEMALE",
//           count: totalFemaleCount,
//           fill: "#FAE27C",
//         },
//         {
//           name: "MALE",
//           count: totalMaleCount,
//           fill: "#C3EBFA",
//         },
//       ];

//       // Formatting the date for each genderData entry
//       const formattedclickRate = clickRate.map((data) => {
//         const date = new Date(data.date);
//         const formattedDate = date.toISOString().split("T")[0]; // Gets "YYYY-MM-DD"

//         return {
//           clickRate: data.clickRate,
//           date: formattedDate,
//         };
//       });

//       // Formatting the date for each genderData entry
//       const formattedPaidImpressions = paidImpressions.map(
//         (data: IPaidImpressions) => {
//           const date = new Date(data.date);
//           const formattedDate = date.toISOString().split("T")[0]; // Gets "YYYY-MM-DD"

//           return {
//             date: formattedDate,
//             income: data.firstLine,
//             expense: data.secondLine,
//           };
//         }
//       );

//       // Return an object containing all the collected data
//       return {
//         vistorCount: totalCount,
//         genderData,
//         formattedclickRate,
//         interest,
//         formattedPaidImpressions,
//       };
//     };

//     static getGenderDataById = async (id: string) => {
//         return await GenderData.findById(id).select('-_id -createdAt -updatedAt -__v');
//     };
// }

export class DashboardServices {
  static getAllDashboardData = async (startDate?: Date, endDate?: Date | null) => {

    let end: Date = new Date(); // Default to current date
    let start: Date = new Date(end.getDate() - 7); // Default to current date -7

    if (startDate) {
      start = new Date(startDate);
    }
    if (endDate ) {
      end.setDate(endDate.getDate());
     } else if (endDate==null) {
      end = new Date();
    }

    const startISO = start.toISOString();
    const endISO = end.toISOString();
    // Fetch gender data between the specified dates
    const genderDataRaw = await GenderData.find({
      date: { $gte: startISO, $lte: endISO },
    }).select("-_id -createdAt -updatedAt -__v");

    // Fetch click rate data between the specified dates
    const clickRate = await ClickRate.find({
      date: { $gte: startISO, $lte: endISO },
    }).select("-_id -createdAt -updatedAt -__v");

    // Fetch interest data between the specified dates (if it includes a date)
    const interest = await InterestData.find({
      date: { $gte: startISO, $lte: endISO },
    }).select("-_id -createdAt -updatedAt -__v");

    // Fetch paid impressions between the specified dates
    const paidImpressions = await PaidImpressions.find({
      date: { $gte: startISO, $lte: endISO },
    })
      .select("-_id -createdAt -updatedAt -__v")
      .sort({ date: 1 }); // Ascending order
    // Group gender data by date and calculate total male and female counts
    const groupedGenderData = genderDataRaw.reduce((acc, data) => {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          totalMaleCount: 0,
          totalFemaleCount: 0,
          totalCount: 0,
        };
      }

      acc[formattedDate].totalMaleCount += data.male;
      acc[formattedDate].totalFemaleCount += data.female;
      acc[formattedDate].totalCount =
        acc[formattedDate].totalMaleCount + acc[formattedDate].totalFemaleCount;

      return acc;
    }, {} as Record<string, { totalMaleCount: number; totalFemaleCount: number; totalCount: number }>);

    // Group clickRate data by date
    const groupedClickRate = clickRate.reduce((acc, data) => {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          clickRate: 0,
          date: formattedDate,
        };
      }

      acc[formattedDate].clickRate += data.clickRate;
      return acc;
    }, {} as Record<string, { clickRate: number; date: string }>);

    // Function to get the day of the week from a date
    const getDayName = (dateString: string) => {
      const date = new Date(dateString);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[date.getDay()];
    };

    // Create the clikeRateChartData for each date where we have both click rate and total count
    const clikeRateChartData = Object.keys(groupedClickRate)
      .map((date) => {
        const clickData = groupedClickRate[date];
        const genderData = groupedGenderData[date];

        if (genderData) {
          const { totalCount } = genderData;
          const present = (clickData.clickRate / totalCount) * 100; // Calculate present as percentage
          const absent = 100 - present; // Calculate absent as the remainder

          return {
            name: getDayName(date), // Convert date to day name (e.g., "Mon")
            present: Math.round(present), // Rounding for cleaner output
            absent: Math.round(absent), // Rounding for cleaner output
          };
        } else {
          return null;
        }
      })
      .filter(
        (data): data is { name: string; present: number; absent: number } =>
          data !== null
      ); // Type guard to remove null

    // Format the gender data as before
    const totalMaleCount = genderDataRaw.reduce(
      (acc, data) => acc + data.male,
      0
    );
    const totalFemaleCount = genderDataRaw.reduce(
      (acc, data) => acc + data.female,
      0
    );
    const totalCount = totalMaleCount + totalFemaleCount;

    const genderData = [
      {
        name: "Total",
        count: totalCount,
        fill: "white",
      },
      {
        name: "FEMALE",
        count: totalFemaleCount,
        fill: "#FAE27C",
      },
      {
        name: "MALE",
        count: totalMaleCount,
        fill: "#C3EBFA",
      },
    ];

    // Formatting the date for each genderData entry
    const formattedPaidImpressions = paidImpressions.map(
      (data: IPaidImpressions) => {
        const date = new Date(data.date);
        const formattedDate = date.toISOString().split("T")[0]; // Gets "YYYY-MM-DD"

        return {
          date: formattedDate,
          income: data.firstLine,
          expense: data.secondLine,
        };
      }
    );

    // Return an object containing all the collected data
    return {
      vistorCount: totalCount,
      genderData, // Keeping genderData as it was
      clikeRateChartData, // Use the new clikeRateChartData format
      interest,
      formattedPaidImpressions,
    };
  };

  static getGenderDataById = async (id: string) => {
    return await GenderData.findById(id).select(
      "-_id -createdAt -updatedAt -__v"
    );
  };
}
