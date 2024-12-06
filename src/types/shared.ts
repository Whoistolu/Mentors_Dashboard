export type TNavMenu = {
    name: string;
    icon: any;
    link: string;
  };
  
  export type TNavMenuButtons = {
    name: string;
    icon: any;
    action: TNavAction;
  };
  
  export type TNavAction = "logout" | "settings" | "support" | "notification";
  