import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Link } from "react-router";
import {
  Calendar as CalendarIcon,
  Filter,
  MoreVertical,
  Search,
  Users,
  Download,
} from "lucide-react";

type AttendanceStatus = "Present" | "Absent";

type AttendanceRecord = {
  id: string;
  name: string;
  email: string;
  gender: "Male" | "Female";
  department: string;
  memberType: "Core Member" | "Volunteer" | "Visitor";
  date: string; // ISO format
  service: string;
  session: "Morning" | "Evening";
  status: AttendanceStatus;
};

const attendanceRecords: AttendanceRecord[] = [
  {
    id: "att_001",
    name: "John Smith",
    email: "john.smith@church.com",
    gender: "Male",
    department: "Worship Ministry",
    memberType: "Core Member",
    date: "2025-01-12",
    service: "Sunday Celebration",
    session: "Morning",
    status: "Present",
  },
  {
    id: "att_002",
    name: "Sarah Johnson",
    email: "sarah.j@church.com",
    gender: "Female",
    department: "Youth Ministry",
    memberType: "Volunteer",
    date: "2025-01-12",
    service: "Sunday Celebration",
    session: "Morning",
    status: "Present",
  },
  {
    id: "att_003",
    name: "Michael Brown",
    email: "michael.b@church.com",
    gender: "Male",
    department: "Children's Ministry",
    memberType: "Core Member",
    date: "2025-01-12",
    service: "Kids Connect",
    session: "Morning",
    status: "Absent",
  },
  {
    id: "att_004",
    name: "Emily Davis",
    email: "emily.d@church.com",
    gender: "Female",
    department: "Outreach Ministry",
    memberType: "Volunteer",
    date: "2025-01-10",
    service: "Community Outreach",
    session: "Evening",
    status: "Present",
  },
  {
    id: "att_005",
    name: "David Wilson",
    email: "david.w@church.com",
    gender: "Male",
    department: "Administration",
    memberType: "Core Member",
    date: "2025-01-10",
    service: "Leadership Sync",
    session: "Evening",
    status: "Present",
  },
  {
    id: "att_006",
    name: "Lisa Anderson",
    email: "lisa.a@church.com",
    gender: "Female",
    department: "Prayer Ministry",
    memberType: "Visitor",
    date: "2025-01-08",
    service: "Midweek Prayers",
    session: "Evening",
    status: "Absent",
  },
  {
    id: "att_007",
    name: "Robert Taylor",
    email: "robert.t@church.com",
    gender: "Male",
    department: "Youth Ministry",
    memberType: "Volunteer",
    date: "2025-01-05",
    service: "Youth Fire",
    session: "Evening",
    status: "Present",
  },
  {
    id: "att_008",
    name: "Jennifer Martinez",
    email: "jennifer.m@church.com",
    gender: "Female",
    department: "Children's Ministry",
    memberType: "Core Member",
    date: "2025-01-05",
    service: "Kids Connect",
    session: "Morning",
    status: "Present",
  },
];

const statusClasses: Record<AttendanceStatus, string> = {
  Present: "bg-green-100 text-green-800 border-green-200",
  Absent: "bg-red-100 text-red-800 border-red-200",
};

const AttendancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">(
    "All"
  );
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [memberTypeFilter, setMemberTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | AttendanceStatus>(
    "All"
  );
  const [serviceFilter, setServiceFilter] = useState<string>("All");
  const [sessionFilter, setSessionFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState("");

  const departments = ["All", ...new Set(attendanceRecords.map((r) => r.department))];
  const memberTypes = ["All", ...new Set(attendanceRecords.map((r) => r.memberType))];
  const services = ["All", ...new Set(attendanceRecords.map((r) => r.service))];
  const sessions = ["All", ...new Set(attendanceRecords.map((r) => r.session))];

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "All" ? true : record.gender === genderFilter;

      const matchesDepartment =
        departmentFilter === "All" ? true : record.department === departmentFilter;

      const matchesMemberType =
        memberTypeFilter === "All" ? true : record.memberType === memberTypeFilter;

      const matchesStatus =
        statusFilter === "All" ? true : record.status === statusFilter;

      const matchesService =
        serviceFilter === "All" ? true : record.service === serviceFilter;

      const matchesSession =
        sessionFilter === "All" ? true : record.session === sessionFilter;

      const matchesDate = dateFilter ? record.date === dateFilter : true;

      return (
        matchesSearch &&
        matchesGender &&
        matchesDepartment &&
        matchesMemberType &&
        matchesStatus &&
        matchesService &&
        matchesSession &&
        matchesDate
      );
    });
  }, [
    searchTerm,
    genderFilter,
    departmentFilter,
    memberTypeFilter,
    statusFilter,
    serviceFilter,
    sessionFilter,
    dateFilter,
  ]);

  const summary = useMemo(() => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter((r) => r.status === "Present").length;
    const absent = attendanceRecords.filter((r) => r.status === "Absent").length;
    const visitors = attendanceRecords.filter((r) => r.memberType === "Visitor").length;

    return { total, present, absent, visitors };
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Attendance</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Link to="/attendance/record">
            <Button className="gap-2 bg-black text-white hover:bg-gray-900">
              <Users className="h-4 w-4" />
              Record Attendance
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Total Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
            <p className="text-xs text-gray-500 mt-1">
              Across all tracked services
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{summary.present}</p>
            <p className="text-xs text-gray-500 mt-1">Marked present</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{summary.absent}</p>
            <p className="text-xs text-gray-500 mt-1">Need follow up</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{summary.visitors}</p>
            <p className="text-xs text-gray-500 mt-1">First-time guests</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Query attendance by any criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by member name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => setDateFilter("")}
                className="whitespace-nowrap"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <Select value={genderFilter} onValueChange={(value) => setGenderFilter(value as "All" | "Male" | "Female")}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={memberTypeFilter} onValueChange={setMemberTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Member Type" />
              </SelectTrigger>
              <SelectContent>
                {memberTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "All" | AttendanceStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sessionFilter} onValueChange={setSessionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => (
                  <SelectItem key={session} value={session}>
                    {session}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Save Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Present & absent logs for every gathering</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Member Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="font-semibold text-gray-900">{record.name}</div>
                    <div className="text-xs text-gray-500">{record.email}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {record.department}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {record.memberType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      {record.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {record.service}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {record.session}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusClasses[record.status]}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark Follow-up</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Remove Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRecords.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No attendance records match your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default AttendancePage;
