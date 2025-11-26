import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/admin-signin.tsx"),
  layout("./components/layout.tsx", [
    route("/dashboard", "./routes/dashboard.tsx"),
    route("/members", "./routes/members.tsx"),
    route("/members/:memberId", "./routes/member-detail.tsx"),
    route("members/new", "./routes/add-member.tsx"),
    route("/departments", "./routes/departments.tsx"),
    route(
      "/departments/:departmentId/members",
      "./routes/department-members.tsx"
    ),
    route("/events", "./routes/events.tsx"),
    route("/events/new", "./routes/add-event.tsx"),
    route("/attendance", "./routes/attendance.tsx"),
    route("/attendance/record", "./routes/attendance-record.tsx"),
    route("/settings", "./routes/settings.tsx"),
  ]),
  route("/record-attendance/checkin", "./routes/checkin.tsx"),
] satisfies RouteConfig;
