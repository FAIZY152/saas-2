import {
  BarChart3,
  DollarSign,
  Home,
  Image,
  PlayCircle,
  Settings,
  TrendingUp,
  User,
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

interface AppSidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const menuItems = [
  { title: "Overview", icon: Home, key: "overview" },
  { title: "Thumbnail Generator", icon: Image, key: "thumbnail" },
  { title: "Search Thumbnail", icon: Video, key: "search" },
  { title: "Keywords", icon: Settings, key: "keywords" },
  { title: "Optimize", icon: TrendingUp, key: "optimize" },
  { title: "Outlier", icon: BarChart3, key: "outlier" },
  { title: "Video Content Generator", icon: PlayCircle, key: "video" },
  { title: "Billing", icon: DollarSign, key: "billing" },
  { title: "Profile", icon: User, key: "profile" },
];

export function AppSidebar({ activeComponent, setActiveComponent }: AppSidebarProps) {
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
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    isActive={activeComponent === item.key}
                    onClick={() => setActiveComponent(item.key)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveComponent("settings")}>
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    <span>Settings</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}