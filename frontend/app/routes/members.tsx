import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Download,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router";

// Church members data
const churchMembers = [
  {
    id: "m_001",
    name: "John Smith",
    email: "john.smith@church.com",
    phone: "+1 (555) 123-4567",
    department: "Worship",
    joinDate: "15 March, 2024",
    status: "Active",
    avatar: "JS",
  },
  {
    id: "m_002",
    name: "Sarah Johnson",
    email: "sarah.j@church.com",
    phone: "+1 (555) 234-5678",
    department: "Youth Ministry",
    joinDate: "22 April, 2024",
    status: "Active",
    avatar: "SJ",
  },
  {
    id: "m_003",
    name: "Michael Brown",
    email: "michael.b@church.com",
    phone: "+1 (555) 345-6789",
    department: "Children's Ministry",
    joinDate: "10 May, 2024",
    status: "Active",
    avatar: "MB",
  },
  {
    id: "m_004",
    name: "Emily Davis",
    email: "emily.d@church.com",
    phone: "+1 (555) 456-7890",
    department: "Outreach",
    joinDate: "5 June, 2024",
    status: "Active",
    avatar: "ED",
  },
  {
    id: "m_005",
    name: "David Wilson",
    email: "david.w@church.com",
    phone: "+1 (555) 567-8901",
    department: "Administration",
    joinDate: "18 July, 2024",
    status: "Active",
    avatar: "DW",
  },
  {
    id: "m_006",
    name: "Lisa Anderson",
    email: "lisa.a@church.com",
    phone: "+1 (555) 678-9012",
    department: "Worship",
    joinDate: "12 August, 2024",
    status: "Inactive",
    avatar: "LA",
  },
  {
    id: "m_007",
    name: "Robert Taylor",
    email: "robert.t@church.com",
    phone: "+1 (555) 789-0123",
    department: "Youth Ministry",
    joinDate: "25 September, 2024",
    status: "Active",
    avatar: "RT",
  },
  {
    id: "m_008",
    name: "Jennifer Martinez",
    email: "jennifer.m@church.com",
    phone: "+1 (555) 890-1234",
    department: "Children's Ministry",
    joinDate: "8 October, 2024",
    status: "Active",
    avatar: "JM",
  },
];

const departments = [
  "All Departments",
  "Worship",
  "Youth Ministry",
  "Children's Ministry",
  "Outreach",
  "Administration",
];

const MembersPage = () => {
  const [members, setMembers] = useState(churchMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Filter members based on search and department
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        member.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [members, searchTerm, selectedDepartment]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map((m) => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const handleDelete = (memberId: string) => {
    setMembers(members.filter((m) => m.id !== memberId));
    setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
  };

  const handleExport = (format: string) => {
    // Export functionality - can be implemented with actual export logic
    console.log(`Exporting ${selectedMembers.length} members as ${format}`);
  };

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

  const isAllSelected =
    filteredMembers.length > 0 &&
    selectedMembers.length === filteredMembers.length;
  const isIndeterminate =
    selectedMembers.length > 0 &&
    selectedMembers.length < filteredMembers.length;

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Members</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filter
          </Button>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("CSV")}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("Excel")}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("PDF")}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link to="/members/new">
          <Button className="bg-black text-white hover:bg-gray-800 gap-2">
            + New Member
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected || isIndeterminate}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={(checked) =>
                        handleSelectMember(member.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/members/${member.id}`}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {member.avatar}
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
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{member.department}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{member.joinDate}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{member.phone}</span>
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
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/members/${member.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Delete"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default MembersPage;
