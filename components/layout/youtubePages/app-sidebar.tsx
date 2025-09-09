import {
  BarChart3,
  DollarSign,
  Eye,
  Home,
  Image,
  PlayCircle,
  Settings,
  TrendingUp,
  User,
  Users,
  Video,
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
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", icon: Home, url: "#", isActive: true },
  { title: "Thumbnail Generator", icon: Image, url: "#" },
  { title: "Search Thumbnail", icon: Video, url: "#" },
  { title: "Keywords", icon: Settings, url: "#" },
  { title: "Optimize", icon: TrendingUp, url: "#" },
  { title: "Outlier", icon: BarChart3, url: "#" },
  { title: "Video Content Generator", icon: PlayCircle, url: "#" },
  { title: "Billing", icon: DollarSign, url: "#" },
  { title: "Profile", icon: User, url: "#" },
];

const quickStats = [
  { title: "Total Views", icon: Eye, value: "2.4M" },
  { title: "Watch Time", icon: PlayCircle, value: "1.2M hrs" },
  { title: "Subscribers", icon: Users, value: "45.2K" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold truncate">
              YouTube Analytics
            </h2>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {quickStats.map((stat) => (
                <div
                  key={stat.title}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <stat.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{stat.value}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
