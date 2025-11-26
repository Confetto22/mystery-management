import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ArrowLeft, Users, Mail, Phone, Eye } from "lucide-react";
import { Link, useParams } from "react-router";

// Extended department data
const departmentsData: Record<
  string,
  {
    id: string;
    name: string;
    head: string;
    headEmail: string;
    headPhone: string;
    members: number;
    description: string;
    icon: string;
    color: string;
    establishedDate: string;
  }
> = {
  d_001: {
    id: "d_001",
    name: "Worship Ministry",
    head: "John Smith",
    headEmail: "john.smith@church.com",
    headPhone: "+1 (555) 123-4567",
    members: 24,
    description:
      "Leads the congregation in worship through music, prayer, and praise. Responsible for Sunday services and special worship events.",
    icon: "🎵",
    color: "bg-blue-500",
    establishedDate: "January 15, 2020",
  },
  d_002: {
    id: "d_002",
    name: "Youth Ministry",
    head: "Sarah Johnson",
    headEmail: "sarah.j@church.com",
    headPhone: "+1 (555) 234-5678",
    members: 18,
    description:
      "Dedicated to nurturing and guiding young people in their faith journey. Organizes youth events, retreats, and mentorship programs.",
    icon: "🌟",
    color: "bg-green-500",
    establishedDate: "March 10, 2019",
  },
  d_003: {
    id: "d_003",
    name: "Children's Ministry",
    head: "Michael Brown",
    headEmail: "michael.b@church.com",
    headPhone: "+1 (555) 345-6789",
    members: 32,
    description:
      "Creates engaging programs and activities for children to learn about faith in fun and age-appropriate ways.",
    icon: "👶",
    color: "bg-purple-500",
    establishedDate: "June 5, 2018",
  },
  d_004: {
    id: "d_004",
    name: "Outreach Ministry",
    head: "Emily Davis",
    headEmail: "emily.d@church.com",
    headPhone: "+1 (555) 456-7890",
    members: 15,
    description:
      "Serves the community through various outreach programs, food drives, and mission trips to spread God's love.",
    icon: "🤝",
    color: "bg-orange-500",
    establishedDate: "September 20, 2020",
  },
  d_005: {
    id: "d_005",
    name: "Administration",
    head: "David Wilson",
    headEmail: "david.w@church.com",
    headPhone: "+1 (555) 567-8901",
    members: 8,
    description:
      "Handles church operations, finances, communications, and ensures smooth day-to-day functioning of the church.",
    icon: "📋",
    color: "bg-pink-500",
    establishedDate: "February 12, 2017",
  },
  d_006: {
    id: "d_006",
    name: "Prayer Ministry",
    head: "Lisa Anderson",
    headEmail: "lisa.a@church.com",
    headPhone: "+1 (555) 678-9012",
    members: 12,
    description:
      "Coordinates prayer requests, prayer meetings, and intercessory prayer for the church and community.",
    icon: "🙏",
    color: "bg-indigo-500",
    establishedDate: "November 8, 2019",
  },
};

// Department members data
const departmentMembers: Record<string, Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
}>> = {
  d_001: [
    {
      id: "m_001",
      name: "John Smith",
      email: "john.smith@church.com",
      phone: "+1 (555) 123-4567",
      role: "Worship Leader",
      status: "Active",
      joinDate: "15 March, 2024",
    },
    {
      id: "m_002",
      name: "Sarah Johnson",
      email: "sarah.j@church.com",
      phone: "+1 (555) 234-5678",
      role: "Backup Vocalist",
      status: "Active",
      joinDate: "22 April, 2024",
    },
    {
      id: "m_003",
      name: "Michael Brown",
      email: "michael.b@church.com",
      phone: "+1 (555) 345-6789",
      role: "Guitarist",
      status: "Active",
      joinDate: "10 May, 2024",
    },
  ],
  d_002: [
    {
      id: "m_002",
      name: "Sarah Johnson",
      email: "sarah.j@church.com",
      phone: "+1 (555) 234-5678",
      role: "Youth Coordinator",
      status: "Active",
      joinDate: "22 April, 2024",
    },
    {
      id: "m_007",
      name: "Robert Taylor",
      email: "robert.t@church.com",
      phone: "+1 (555) 789-0123",
      role: "Youth Mentor",
      status: "Active",
      joinDate: "25 September, 2024",
    },
  ],
  d_003: [
    {
      id: "m_003",
      name: "Michael Brown",
      email: "michael.b@church.com",
      phone: "+1 (555) 345-6789",
      role: "Children's Ministry Leader",
      status: "Active",
      joinDate: "10 May, 2024",
    },
    {
      id: "m_008",
      name: "Jennifer Martinez",
      email: "jennifer.m@church.com",
      phone: "+1 (555) 890-1234",
      role: "Sunday School Teacher",
      status: "Active",
      joinDate: "8 October, 2024",
    },
  ],
  d_004: [
    {
      id: "m_004",
      name: "Emily Davis",
      email: "emily.d@church.com",
      phone: "+1 (555) 456-7890",
      role: "Outreach Coordinator",
      status: "Active",
      joinDate: "5 June, 2024",
    },
  ],
  d_005: [
    {
      id: "m_005",
      name: "David Wilson",
      email: "david.w@church.com",
      phone: "+1 (555) 567-8901",
      role: "Administrative Assistant",
      status: "Active",
      joinDate: "18 July, 2024",
    },
  ],
  d_006: [
    {
      id: "m_006",
      name: "Lisa Anderson",
      email: "lisa.a@church.com",
      phone: "+1 (555) 678-9012",
      role: "Prayer Coordinator",
      status: "Inactive",
      joinDate: "12 August, 2024",
    },
  ],
};

const DepartmentMembersPage = () => {
  const { departmentId } = useParams<{ departmentId: string }>();

  const department = departmentId ? departmentsData[departmentId] : null;
  const members = departmentId
    ? departmentMembers[departmentId] || []
    : [];

  if (!department) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Department Not Found</h1>
          <p className="text-gray-500 mb-4">
            The department you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/departments">Go Back to Departments</Link>
          </Button>
        </div>
      </main>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/departments">Departments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{department.name} Members</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Department Info Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Link to="/departments">
              <Button variant="outline" size="icon" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`h-16 w-16 rounded-lg ${department.color} flex items-center justify-center text-3xl`}
              >
                {department.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{department.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Users className="h-4 w-4" />
                  {members.length} Members
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{department.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">Head:</span>
              <span>{department.head}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{department.headEmail}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Department Members</CardTitle>
          <CardDescription>
            All members associated with {department.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center p-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No members found
              </h3>
              <p className="text-gray-500">
                This department doesn't have any members yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{member.role}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{member.joinDate}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusVariant(member.status)}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/members/${member.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DepartmentMembersPage;
