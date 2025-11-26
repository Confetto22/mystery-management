import { Link } from "react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CheckCircle2, Users } from "lucide-react";

const events = [
  "Sunday Celebration - 9AM",
  "Sunday Celebration - 11AM",
  "Midweek Service",
  "Youth Fire Night",
  "Prayer Watch",
];

const AttendanceRecordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Record Attendance</h1>
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
                <Link to="/attendance">Attendance</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Record Attendance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Service Check-in</CardTitle>
            <CardDescription>
              Capture first-time visitors or anyone checking in manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="e.g., John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="e.g., Smith"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event">Service / Event</Label>
                  <Select name="event" required>
                    <SelectTrigger id="event">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Street, City, State"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" className="gap-2" disabled={isSubmitting}>
                  <Users className="h-4 w-4" />
                  {isSubmitting ? "Recording..." : "Check In"}
                </Button>
                {isSuccess && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Attendance recorded!
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
            <CardDescription>
              Simple check-in for ushers and greeters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-600">
            <p>
              This is the primary form for recording attendance manually. Only
              basic details are collected to keep the process fast during
              service.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use this for first-time visitors or manual entry.</li>
              <li>All submissions sync to the attendance dashboard.</li>
              <li>You can switch services anytime with the dropdown field.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AttendanceRecordPage;
