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
  ]),
  route("/record-attendance/checkin", "./routes/checkin.tsx"),
] satisfies RouteConfig;
