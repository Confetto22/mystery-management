import {
  Calendar,
  CalendarCog,
  Home,
  Inbox,
  LayoutDashboard,
  List,
  NotebookTabs,
  Search,
  Settings,
  UserPen,
  UserPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router";
import { useRef, useState } from "react";

export function AppSidebar() {
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const navItems = [
    {
      title: "Overview",
      group: [
        { ref: "dashboard", refLink: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "Membership",
      group: [
        { ref: "Directory", refLink: "#", icon: List },
        { ref: "Add Member", refLink: "#", icon: UserPlus },
      ],
    },
    {
      title: "Attendance",
      group: [
        { ref: "All Records", refLink: "#", icon: NotebookTabs },
        { ref: "Record Attendance", refLink: "#", icon: UserPen },
        { ref: "Services & Events", refLink: "#", icon: CalendarCog },
      ],
    },
    // {
    //   title: "System",
    //   group: [{ ref: "Settings", refLink: "#", icon: Settings }],
    // },
  ];

  return (
    <Sidebar className="">
      <SidebarHeader className="py-8">
        <img
          src="https://res.cloudinary.com/dv9aqxptd/image/upload/v1762542048/homchapel/TESLA_mueunu.svg"
          alt="mystery embassy"
          className="max-w-[150px] mx-auto"
        />
      </SidebarHeader>
      <SidebarContent className="">
        {navItems.map((singleItem) => (
          <SidebarGroup key={singleItem.title}>
            <SidebarGroupLabel className="uppercase text-[.7rem] text-gray-400">
              {singleItem.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {singleItem.group.map((item) => (
                <SidebarMenuItem
                  key={item.ref}
                  className=""
                  onClick={() => setSelectedItem(item.ref)}
                >
                  <SidebarMenuButton
                    asChild
                    className={`rounded-lg px-2 ${selectedItem === item.ref ? "bg-(--main-blue) text-white " : ""}`}
                  >
                    <Link to={item.refLink}>
                      <item.icon />
                      <span>{item.ref}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {/* <SidebarGroup>
          <SidebarGroupContent>
            
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
