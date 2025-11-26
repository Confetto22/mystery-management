import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Progress } from "~/components/ui/progress";
import { Briefcase, ListTodo, Users, TrendingUp, Bot } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { useGetOverviewQuery } from "~/services/overview/hooks";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const { data: overviewData, isLoading, isError } = useGetOverviewQuery();
  const {
    absentToday,
    deptPopulation,
    firstTimers,
    genders,
    presentToday,
    upcomingEvts,
    totalMembers,
  } = overviewData || {};
  // console.log(absentToday);
  const allMembers = totalMembers?.length || 0;
  const summaryCards = [
    {
      title: "Total Members",
      value: totalMembers?.length || "0",
      // subtitle: "2 Completed",
      icon: Briefcase,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "First Timers",
      value: firstTimers?.length || "0",
      // subtitle: "28 Completed",
      icon: ListTodo,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },

    {
      title: "Attendance Today",
      value: presentToday?.length || "0",
      subtitle: "70%",
      icon: TrendingUp,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvts?.length || "0",
      // subtitle: "2 New This Month",
      icon: Users,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
  ];

  // Population by department data
  // const departmentPopulation = [
  //   {
  //     name: "Media",
  //     lead: "John Smith",
  //     members: 12,
  //     // growth: "+8%",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     name: "Choir",
  //     lead: "Sarah Johnson",
  //     members: 18,
  //     // growth: "+5%",
  //     color: "bg-green-500",
  //   },
  //   {
  //     name: "Custodians",
  //     lead: "Michael Brown",
  //     members: 16,
  //     // growth: "+12%",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     name: "Pastors & Stewards",
  //     lead: "Emily Davis",
  //     members: 4,
  //     // growth: "+3%",
  //     color: "bg-orange-500",
  //   },
  //   {
  //     name: "Musicians",
  //     lead: "Lisa Anderson",
  //     members: 9,
  //     // growth: "+2%",
  //     color: "bg-indigo-500",
  //   },
  // ];

  // const members = deptPopulation.reduce(
  //   (sum, dept) => sum + dept._count.members,
  //   0
  // );

  // Gender distribution data
  const genderDistribution =
    overviewData?.genders?.map((genderData) => {
      const name = genderData.gender === "female" ? "Women" : "Men";
      const value = genderData._count.id;
      const color = genderData.gender === "female" ? "#EC4899" : "#0EA5E9";
      return { name, value, color };
    }) || [];
  const totalGender = genderDistribution.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <Card key={index} className={`${card.bgColor} border-0 shadow-sm`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Population by Department */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Population by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Department</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Population Share</TableHead>
                  {/* <TableHead className="text-right">Growth</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {deptPopulation?.map((dept, index) => {
                  const share = Math.round(
                    (dept._count.members / allMembers) * 100
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg ${dept.color} text-white flex items-center justify-center text-sm font-semibold`}
                          >
                            {dept.name
                              .split(" ")
                              .map((word: string) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {dept.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Lead:{" "}
                              {dept.members > 0
                                ? "N/A"
                                : `${dept.members?.firstname} ${dept.members?.lastname}`}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900">
                          {dept._count.members}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 w-48">
                          <Progress value={share} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600 w-12">
                            {share}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Gender Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col  items-center gap-6">
                <div className="w-full  h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {genderDistribution.map((segment) => (
                          <Cell
                            key={segment.name}
                            fill={segment.color}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid space-y-4 w-full">
                  {genderDistribution.map((segment) => {
                    const percentage = Math.round(
                      (segment.value / totalGender) * 100
                    );
                    return (
                      <div
                        key={segment.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {segment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {percentage}% of total population
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {segment.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Card */}
          {/* <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    How AI assist will help you?
                  </h3>
                  <p className="text-sm text-green-50 opacity-90">
                    Get intelligent insights and automate your church management
                    tasks.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
