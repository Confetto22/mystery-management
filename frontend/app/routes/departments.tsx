import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import {
  Search,
  MoreVertical,
  Users,
  User,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Church,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

// Church-based departments data
const churchDepartments = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

type Department = (typeof churchDepartments)[0];

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState(churchDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Filter departments based on search
  const filteredDepartments = useMemo(() => {
    if (!searchTerm) return departments;
    const term = searchTerm.toLowerCase();
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.head.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
    );
  }, [departments, searchTerm]);

  const handleEdit = (dept: Department) => {
    setSelectedDept(dept);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (dept: Department) => {
    setSelectedDept(dept);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDetails = (dept: Department) => {
    setSelectedDept(dept);
    setIsViewDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDept) {
      setDepartments(departments.filter((d) => d.id !== selectedDept.id));
      setIsDeleteDialogOpen(false);
      setSelectedDept(null);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDept) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const updatedDept = {
        ...selectedDept,
        name: formData.get("name") as string,
        head: formData.get("head") as string,
        description: formData.get("description") as string,
      };
      setDepartments(
        departments.map((d) => (d.id === selectedDept.id ? updatedDept : d))
      );
      setIsEditDialogOpen(false);
      setSelectedDept(null);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Departments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link to="/departments/new">
          <Button className="bg-black text-white hover:bg-gray-800 gap-2">
            <Plus className="h-4 w-4" />
            New Department
          </Button>
        </Link>
      </div>

      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <Church className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No departments found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? `No departments match "${searchTerm}"`
                : "Get started by creating your first department"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((dept) => (
            <Card
              key={dept.id}
              className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-lg ${dept.color} flex items-center justify-center text-2xl`}
                    >
                      {dept.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{dept.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <User className="h-3 w-3" />
                        {dept.head}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(dept)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <Link to={`/departments/${dept.id}/members`}>
                        <DropdownMenuItem className="gap-2">
                          <Users className="h-4 w-4" />
                          View Members
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleEdit(dept)}
                        className="gap-2"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit Department
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(dept)}
                        className="gap-2 text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {dept.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{dept.members}</span>
                    <span>Members</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                <Link
                  to={`/departments/${dept.id}/members`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full gap-2">
                    View Members
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDept && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-12 w-12 rounded-lg ${selectedDept.color} flex items-center justify-center text-2xl`}
                  >
                    {selectedDept.icon}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedDept.name}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base">
                  Complete department information and details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600">{selectedDept.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">
                      Department Head
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {selectedDept.head
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedDept.head}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {selectedDept.headEmail}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {selectedDept.headPhone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            Total Members
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {selectedDept.members}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">
                            Established
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {selectedDept.establishedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Link to={`/departments/${selectedDept.id}/members`}>
                  <Button className="gap-2">
                    View Members
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {selectedDept && (
            <form onSubmit={handleSaveEdit}>
              <DialogHeader>
                <DialogTitle>Edit Department</DialogTitle>
                <DialogDescription>
                  Update the details for {selectedDept.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Department Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedDept.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-head">Department Head</Label>
                  <Input
                    id="edit-head"
                    name="head"
                    defaultValue={selectedDept.head}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <textarea
                    id="edit-description"
                    name="description"
                    defaultValue={selectedDept.description}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedDept && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Department?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the{" "}
                  <strong>{selectedDept.name}</strong> department and all
                  associated data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete Department
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default DepartmentsPage;
