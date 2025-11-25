import { useEffect, useMemo, useState } from "react";
import { Form } from "react-router";
import { MapPin, Phone, User, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { PickDate } from "~/components/PickDate";
import axios from "axios";

type AttendanceMode = "service" | "event";

const CheckIn = () => {
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkInService, setCheckinService] = useState("");
  const [checkInEvent, setCheckinEvent] = useState("");
  const fetchServices = async () => {
    try {
      const response1 = await axios.get(
        "http://localhost:5000/api/services/all"
      );
      setServices(response1.data.data);

      const response2 = await axios.get("http://localhost:5000/api/events/all");
      setEvents(response2.data.data);
      //   console.log(response.data.data);
    } catch (error) {
      console.log("error loading data:", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  //   console.log(services);

  const handleCheckin = async (e) => {
    e.preventDefault();
    try {
      const checkin = await axios.post(
        "http://localhost:5000/api/attendance/checkin",
        {
          address,
          serviceName: "",
          eventName: "Prayer Feast",
          firstname,
          lastname,
          memberType: "regular",
          phone,
        }
      );
      console.log("Check-in successful:", checkin.data);
      // Reset form fields after successful check-in
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  const [attendanceMode, setAttendanceMode] =
    useState<AttendanceMode>("service");
  //   const [category, setCategory] = useState<AttendeeCategory>("member");
  //   const [memberType, setMemberType] = useState<MemberTypeOption>("regular");

  //   const attendanceStatus = "present";

  //   const memberTypeOptions = useMemo(
  //     () => [
  //       { value: "regular", label: "Regular Member" },
  //       { value: "visitor", label: "Visitor" },
  //     ],
  //     []
  //   );
  //   console.log(services[0].name);
  // console.log(firstname);

  return (
    <section className="min-h-screen bg-[#F5F7FB] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 md:px-12">
        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--main-blue)]">
            record attendance
          </span>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Sleek check-in for services and events
          </h1>
          <p className="text-base text-slate-500 md:text-lg">
            Capture attendee details in seconds. Use quick toggles to mark
            members or guests, associate them with a service or event, and
            submit attendance that syncs with your dashboard analytics.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-6 lg:max-w-5xl mx-auto">
          <Card className="border border-gray-300 lg:col-span-4">
            <CardHeader className="gap-3 border-b border-slate-100 pb-6">
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Check-in form
              </CardTitle>
              <CardDescription className="text-slate-500">
                Provide attendee information and choose the attendance context.
                Status is automatically set to present.
              </CardDescription>
            </CardHeader>
            <form
              // method="post"
              className="flex flex-col gap-8"
              id="attendance-checkin-form"
              onSubmit={(e) => handleCheckin(e)}
            >
              <CardContent className="flex flex-col gap-8 pt-6">
                {/* <div className="flex flex-col gap-3">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Attendee category
                  </Label>
                  <ToggleGroup
                    type="single"
                    value={category}
                    onValueChange={(value) => {
                      if (value) {
                        setCategory(value as AttendeeCategory);
                      }
                    }}
                    className="bg-slate-100 p-1"
                  >
                    <ToggleGroupItem
                      value="member"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium uppercase data-[state=on]:bg-white data-[state=on]:text-[var(--main-blue)]"
                    >
                      <Users className="size-4" />
                      Member
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="guest"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium uppercase data-[state=on]:bg-white data-[state=on]:text-[var(--main-blue)]"
                    >
                      <User className="size-4" />
                      Guest
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <input type="hidden" name="category" value={category} />
                </div> */}

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstname" className="text-sm font-medium">
                      First name
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="firstname"
                        name="firstname"
                        placeholder="e.g. David"
                        className="pl-11"
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastname" className="text-sm font-medium">
                      Last name
                    </Label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="lastname"
                        name="lastname"
                        placeholder="e.g. Mensah"
                        className="pl-11"
                        required
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone number
                    </Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="+233 55 123 4567"
                        className="pl-11"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Registered members are matched automatically via their
                      phone number.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address
                    </Label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="address"
                        name="address"
                        placeholder="Neighborhood, city"
                        className="pl-11"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="flex flex-col gap-3">
                  <Label htmlFor="memberType" className="text-sm font-medium">
                    Member type
                  </Label>
                  <Select
                    value={memberType}
                    onValueChange={(value) =>
                      setMemberType(value as MemberTypeOption)
                    }
                  >
                    <SelectTrigger
                      id="memberType"
                      className="h-12 rounded-lg border-slate-200"
                    >
                      <SelectValue placeholder="Select member type" />
                    </SelectTrigger>
                    <SelectContent>
                      {memberTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="memberType" value={memberType} />
                </div> */}

                {/* <input
                  type="hidden"
                  name="attendance_status"
                  value={attendanceStatus}
                /> */}
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between">
                {/* <div className="flex items-center gap-3 text-sm text-slate-500">
                  <ClipboardCheck className="size-5 text-[var(--main-blue)]" />
                  Attendance status will be saved as{" "}
                  <span className="font-semibold text-slate-700">Present</span>.
                </div> */}
                <Button
                  type="submit"
                  className="h-12 rounded-lg bg-[var(--main-blue)] px-8 text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-[var(--main-blue)]/30 transition hover:bg-[var(--main-blue)]/90"
                >
                  confirm check-in
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card className="border-0 text-black shadow-xl p-5">
              {/* <CardHeader className="gap-3">
                <CardTitle className="text-2xl font-semibold">
                  What gets recorded
                </CardTitle>
                <CardDescription className="text-blue-100">
                  We store attendance with these fields so every check-in syncs
                  with analytics and history.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-sm leading-relaxed text-blue-50">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-200" />
                    <span>
                      Personal info: first name, last name, phone and address
                      help us match existing members or create new records.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-200" />
                    <span>
                      Engagement context: connect an attendee to a service or
                      event to keep participation stats accurate.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-200" />
                    <span>
                      Attendance status: every check-in marks them{" "}
                      <strong>present</strong> with a timestamp.
                    </span>
                  </li>
                </ul>
              </CardContent> */}
              <div className="flex flex-col gap-3">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Attendance context
                </Label>
                <Tabs
                  value={attendanceMode}
                  onValueChange={(value) =>
                    setAttendanceMode(value as AttendanceMode)
                  }
                  className="w-full"
                >
                  <TabsList className="bg-slate-100 p-1">
                    <TabsTrigger
                      value="service"
                      className="rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-[var(--main-blue)]"
                    >
                      Service
                    </TabsTrigger>
                    <TabsTrigger
                      value="event"
                      className="rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-[var(--main-blue)]"
                    >
                      Event
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="service" className="pt-5  grid gap-5">
                    {/* <div className="grid gap-5 md:grid-cols-3"> */}
                    <div className="flex flex-col gap-1 ">
                      <Label className="text-sm font-medium">Service</Label>
                      <Select defaultValue={services[0]?.name}>
                        <SelectTrigger className="h-12 rounded-lg border-slate-200 w-full">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem value={service?.name} key={service?.id}>
                              {service?.name}
                            </SelectItem>
                          ))}
                          {/* <SelectItem value="sunday-second">
                            Sunday Celebration - Second Service
                          </SelectItem>
                          <SelectItem value="midweek">
                            Midweek Encounter
                          </SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium">Time</Label>
                        <div className="relative">
                          <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            name="serviceTime"
                            placeholder="Auto-captures current time"
                            className="pl-11"
                            readOnly
                            value="Now"
                          />
                        </div>
                      </div> */}
                    <PickDate />
                    {/* </div> */}
                  </TabsContent>

                  <TabsContent value="event" className="pt-5     grid gap-5">
                    <div className="flex flex-col gap-1  ">
                      <Label className="text-sm font-medium">Event</Label>
                      <Select defaultValue={events[0]?.name}>
                        <SelectTrigger className="h-12 w-full rounded-lg border-slate-200">
                          <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem value={event?.name} key={event?.id}>
                              {event?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <PickDate />
                    {/* <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium">
                            Event date
                          </Label>
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              name="eventDate"
                              placeholder="Select from calendar"
                              className="pl-11"
                              type="date"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-medium">
                            Event date
                          </Label>
                          <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              name="eventDate"
                              placeholder="Select from calendar"
                              className="pl-11"
                              type="date"
                            />
                          </div>
                        </div> */}
                  </TabsContent>
                </Tabs>
                {/* <input
                  type="hidden"
                  name="attendanceMode"
                  value={attendanceMode}
                /> */}
              </div>
            </Card>
            {/* 
            <Card className="border-0 shadow-lg">
              <CardHeader className="gap-2">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Check-in tips
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Make every Sunday or special event smooth and welcoming.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-slate-600">
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 p-4">
                  <p className="font-medium text-slate-800">
                    1. Start with phone number
                  </p>
                  <p>
                    Ask for the phone first—if they&apos;re already a registered
                    member it instantly autofills their profile on submit.
                  </p>
                </div>
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 p-4">
                  <p className="font-medium text-slate-800">
                    2. Log services and events separately
                  </p>
                  <p>
                    Use the tabs to capture whether it&apos;s a regular service
                    or a special event so analytics stay sharp.
                  </p>
                </div>
                <div className="rounded-lg border border-dashed border-slate-200 bg-white/60 p-4">
                  <p className="font-medium text-slate-800">
                    3. Keep the line moving
                  </p>
                  <p>
                    Prepare default options for popular services and
                    pre-schedule events so volunteers can select them instantly.
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckIn;
