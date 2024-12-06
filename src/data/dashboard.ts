import { TNavMenu, TNavMenuButtons } from "@/types";

export const DashBoardUpperNavs: TNavMenu[] = [
  {
    name: "Dashboard",
    icon: "/img/icon/dashboard.png",
    link: "/",
  },
  {
    name: "Programs",
    icon: "/img/icon/programs.png",
    link: "/programs",
  },
  {
    name: "Activities",
    icon: "/img/icon/activities.png",
    link: "/activities",
  },
  {
    name: "Finances",
    icon: "/img/icon/finances.png",
    link: "/finances",
  },
  {
    name: "Achievements",
    icon: "/img/icon/achievements.png",
    link: "/achievements",
  },
  {
    name: "Analytics",
    icon: "/img/icon/analytics.png",
    link: "/analytics",
  },
  {
    name: "Settings",
    icon: "/img/icon/settings.png",
    link: "/settings",
  }
];

export const DashBoardLowerNavs: TNavMenuButtons[] = [

  {
    name: "LogOut",
    icon: "/img/lowerNav/logout.png",
    action: "logout",
  },
];

