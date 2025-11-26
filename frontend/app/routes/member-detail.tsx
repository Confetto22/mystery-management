import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Church,
  Edit,
  Trash2,
  Download,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Extended member data with more details
const getMemberDetails = (memberId: string) => {
  const membersData: Record<
    string,
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      department: string;
      joinDate: string;
      status: string;
      avatar: string;
      address?: string;
      dateOfBirth?: string;
      role?: string;
      bio?: string;
      attendanceRate?: number;
      eventsAttended?: number;
      totalServiceHours?: number;
    }
  > = {
    m_001: {
      id: "m_001",
      name: "John Smith",
      email: "john.smith@church.com",
      phone: "+1 (555) 123-4567",
      department: "Worship",
      joinDate: "15 March, 2024",
      status: "Active",
      avatar: "JS",
      address: "123 Church Street, City, State 12345",
      dateOfBirth: "January 15, 1985",
      role: "Worship Leader",
      bio: "Passionate about leading worship and serving the church community. John has been actively involved in the worship ministry for over 5 years.",
      attendanceRate: 92,
      eventsAttended: 45,
      totalServiceHours: 320,
    },
    m_002: {
      id: "m_002",
      name: "Sarah Johnson",
      email: "sarah.j@church.com",
      phone: "+1 (555) 234-5678",
      department: "Youth Ministry",
      joinDate: "22 April, 2024",
      status: "Active",
      avatar: "SJ",
      address: "456 Faith Avenue, City, State 12345",
      dateOfBirth: "March 22, 1990",
      role: "Youth Coordinator",
      bio: "Dedicated to mentoring and guiding the next generation. Sarah brings energy and creativity to our youth programs.",
      attendanceRate: 88,
      eventsAttended: 38,
      totalServiceHours: 280,
    },
    m_003: {
      id: "m_003",
      name: "Michael Brown",
      email: "michael.b@church.com",
      phone: "+1 (555) 345-6789",
      department: "Children's Ministry",
      joinDate: "10 May, 2024",
      status: "Active",
      avatar: "MB",
      address: "789 Hope Drive, City, State 12345",
      dateOfBirth: "July 10, 1988",
      role: "Children's Ministry Leader",
      bio: "Loves working with children and creating engaging programs that help kids grow in faith.",
      attendanceRate: 95,
      eventsAttended: 52,
      totalServiceHours: 410,
    },
    m_004: {
      id: "m_004",
      name: "Emily Davis",
      email: "emily.d@church.com",
      phone: "+1 (555) 456-7890",
      department: "Outreach",
      joinDate: "5 June, 2024",
      status: "Active",
      avatar: "ED",
      address: "321 Grace Lane, City, State 12345",
      dateOfBirth: "September 5, 1992",
      role: "Outreach Coordinator",
      bio: "Committed to serving the community and spreading God's love through outreach programs.",
      attendanceRate: 85,
      eventsAttended: 42,
      totalServiceHours: 350,
    },
    m_005: {
      id: "m_005",
      name: "David Wilson",
      email: "david.w@church.com",
      phone: "+1 (555) 567-8901",
      department: "Administration",
      joinDate: "18 July, 2024",
      status: "Active",
      avatar: "DW",
      address: "654 Mercy Road, City, State 12345",
      dateOfBirth: "November 18, 1987",
      role: "Administrative Assistant",
      bio: "Ensures smooth operations and supports the church's administrative needs.",
      attendanceRate: 90,
      eventsAttended: 48,
      totalServiceHours: 290,
    },
    m_006: {
      id: "m_006",
      name: "Lisa Anderson",
      email: "lisa.a@church.com",
      phone: "+1 (555) 678-9012",
      department: "Worship",
      joinDate: "12 August, 2024",
      status: "Inactive",
      avatar: "LA",
      address: "987 Peace Street, City, State 12345",
      dateOfBirth: "April 12, 1991",
      role: "Backup Vocalist",
      bio: "Talented vocalist who supports the worship team with beautiful harmonies.",
      attendanceRate: 65,
      eventsAttended: 28,
      totalServiceHours: 180,
    },
    m_007: {
      id: "m_007",
      name: "Robert Taylor",
      email: "robert.t@church.com",
      phone: "+1 (555) 789-0123",
      department: "Youth Ministry",
      joinDate: "25 September, 2024",
      status: "Active",
      avatar: "RT",
      address: "147 Joy Boulevard, City, State 12345",
      dateOfBirth: "August 25, 1989",
      role: "Youth Mentor",
      bio: "Dedicated mentor who helps guide young people through their faith journey.",
      attendanceRate: 87,
      eventsAttended: 40,
      totalServiceHours: 310,
    },
    m_008: {
      id: "m_008",
      name: "Jennifer Martinez",
      email: "jennifer.m@church.com",
      phone: "+1 (555) 890-1234",
      department: "Children's Ministry",
      joinDate: "8 October, 2024",
      status: "Active",
      avatar: "JM",
      address: "258 Love Circle, City, State 12345",
      dateOfBirth: "December 8, 1993",
      role: "Sunday School Teacher",
      bio: "Passionate educator who makes learning about faith fun and engaging for children.",
      attendanceRate: 93,
      eventsAttended: 50,
      totalServiceHours: 380,
    },
  };

  return membersData[memberId] || null;
};

// Recent events data
const recentEvents = [
  {
    id: "e_001",
    name: "Sunday Service",
    date: "December 15, 2024",
    status: "Attended",
    type: "Regular Service",
  },
  {
    id: "e_002",
    name: "Christmas Celebration",
    date: "December 22, 2024",
    status: "Attended",
    type: "Special Event",
  },
  {
    id: "e_003",
    name: "Youth Retreat",
    date: "December 10, 2024",
    status: "Attended",
    type: "Retreat",
  },
  {
    id: "e_004",
    name: "Community Outreach",
    date: "December 5, 2024",
    status: "Attended",
    type: "Outreach",
  },
  {
    id: "e_005",
    name: "Sunday Service",
    date: "December 1, 2024",
    status: "Attended",
    type: "Regular Service",
  },
];

const MemberDetailPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const member = memberId ? getMemberDetails(memberId) : null;

  if (!member) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Member Not Found</h1>
          <p className="text-gray-500 mb-4">
            The member you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/members">Go Back to Members</Link>
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
      {/* Header with Breadcrumbs */}
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
                <Link to="/members">Members</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{member.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Profile Header Card */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-4xl font-bold">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant="outline"
                className={getStatusVariant(member.status)}
              >
                {member.status}
              </Badge>
            </div>

            {/* Member Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{member.role}</p>
                  <p className="text-gray-700 max-w-2xl">{member.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Attendance Rate
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {member.attendanceRate}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Events Attended
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {member.eventsAttended}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Service Hours
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {member.totalServiceHours}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Member Since
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {member.joinDate}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Church className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-semibold text-gray-900">
                      {member.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-semibold text-gray-900">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-semibold text-gray-900">
                      {member.joinDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold text-gray-900">
                      {member.dateOfBirth}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold text-gray-900">
                      {member.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900">{member.email}</p>
                </div>
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="font-semibold text-gray-900">{member.phone}</p>
                </div>
                <Button variant="outline" size="sm">
                  Call
                </Button>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Physical Address</p>
                  <p className="font-semibold text-gray-900">
                    {member.address}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Overall Attendance
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {member.attendanceRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${member.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        This Month
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        85%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Service Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {member.totalServiceHours}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Average per Month
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ~35 hours
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.type}</Badge>
                      </TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MemberDetailPage;

