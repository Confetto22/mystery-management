import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "~/lib/types";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(
    {} as AnalyticsData
  );
  // const [members, setMembers] = useState({});
  // const [upcomnigEvts, setUpcomingEvts] = useState({});
  // const [present, setPresent] = useState({});
  // const [departments, setDepartments] = useState({});
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/overview");
      // setMembers(response.data.totalMembers);
      // setUpcomingEvts(response.data.upcomingEvts);
      // setPresent(response.data.presentToday);
      // setDepartments(response.data.departments);
      setAnalytics(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);
  // console.log("analytics:", analytics.absentToday);
  // Sample data for charts
  const chartData = [
    { month: "JAN", value: 20 },
    { month: "FEB", value: 16 },
    { month: "MAR", value: 12 },
    { month: "APR", value: 25 },
    { month: "MAY", value: 22 },
    { month: "JUN", value: 36 },
  ];

  // const departmentData = [
  //   { name: "IT", population: 45 },
  //   { name: "HR", population: 32 },
  //   { name: "Finance", population: 28 },
  //   { name: "Marketing", population: 38 },
  //   { name: "Operations", population: 42 },
  // ];
  const departmentData = analytics.deptPopulation || [];
  console.log(departmentData);

  const cardData = [
    {
      title: "members",
      value:
        analytics?.totalMembers?.length < 10
          ? "0" + analytics?.totalMembers?.length
          : analytics?.totalMembers?.length,
      refLink: "#",
    },
    {
      title: "upcoming events",
      value:
        analytics?.upcomingEvts?.length < 10
          ? "0" + analytics?.upcomingEvts?.length
          : analytics?.upcomingEvts?.length,
      refLink: "#",
    },
    {
      title: "present today",
      value:
        analytics?.presentToday?.length < 10
          ? "0" + analytics?.presentToday?.length
          : analytics?.presentToday?.length,
      refLink: "#",
    },
    {
      title: "absent today",
      value:
        analytics.absentToday?.length < 10
          ? "0" + analytics.absentToday?.length
          : analytics.absentToday?.length,

      refLink: "#",
    },
  ];

  // const genderData = [
  //   { name: "Male", value: 65, color: "#3b82f6" },
  //   { name: "Female", value: 35, color: "#ec4899" },
  // ];
  const genderData = (analytics.genders || []).map((item, index) => ({
    name: item.gender,
    value: item._count.id,
    color: index === 0 ? "#3b82f6" : "#ec4899",
  }));
  console.log(genderData[0]);

  const chartConfig = {
    value: {
      label: "Value",
      color: "#8b5cf6",
    },
  };

  const departmentChartConfig = {
    population: {
      label: "members",
      color: "#10b981",
    },
  };

  const genderChartConfig = {
    male: {
      label: "male",
      color: "#3b82f6",
    },
    female: {
      label: "female",
      color: "#ec4899",
    },
  };

  return (
    <section className="px-8 w-full bg-[#F9F9F9] min-h-screen py-6">
      <div className="header border-b border-gray-300 pb-3 mb-6">
        <h2 className="font-semibold text-[1.3rem] text-gray-800">
          Dashboard Overview
        </h2>
      </div>

      {/* FILTERS Section */}
      {/* <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex gap-4">
          <Select defaultValue="all-time">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All-time</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="specific">Specific Users</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="food-safety">Food Safety</SelectItem>
              <SelectItem value="compliance">Compliance Basics</SelectItem>
              <SelectItem value="networking">Company Networking</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      {/* Main Content Area - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top-Left: DATA CARDS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Data Cards</h3>
          <div className="grid grid-cols-2 gap-4">
            {cardData.map((singleCard) => (
              <Card
                className="border-purple-200 bg-purple-50/50"
                key={singleCard.title}
              >
                <CardHeader className="">
                  <CardDescription className="text-xs capitalize">
                    {singleCard.title}
                  </CardDescription>
                  <CardTitle className="text-[2.1rem] font-semibold">
                    {singleCard.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}

            {/* <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Active Events
                </CardDescription>
                <CardTitle className="text-2xl font-semibold">45</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Departments
                </CardDescription>
                <CardTitle className="text-2xl font-semibold">12</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Attendance Rate
                </CardDescription>
                <CardTitle className="text-2xl font-semibold">87%</CardTitle>
              </CardHeader>
            </Card> */}
          </div>
        </div>

        {/* Top-Right: CHARTS/GRAPHS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            First Timers By Month:
          </h3>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                // domain={[0, 300]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Bottom-Left: POPULATION BY DEPARTMENTS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Population by Departments
          </h3>
          <ChartContainer config={departmentChartConfig} className="h-[250px]">
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
              <XAxis
                type="number"
                tickLine={true}
                axisLine={true}
                domain={[0, 300]}
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={true}
                axisLine={true}
                width={80}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="_count.members"
                fill="var(--color-population)"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Bottom-Right: GENDER DISTRIBUTION */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Gender Distribution
          </h3>
          <ChartContainer config={genderChartConfig} className="">
            <PieChart className="">
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                className=""
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
