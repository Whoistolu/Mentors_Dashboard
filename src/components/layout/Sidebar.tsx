import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TNavAction, TNavMenu, TNavMenuButtons } from "@/types";
import { DashBoardLowerNavs, DashBoardUpperNavs } from "@/data";


const Sidebar = ({
  handleLogout,
  mobile,
  callback,
  token,
  handleNotification,
}: {
  handleLogout: () => void;
  handleNotification: () => void;
  callback: () => void;
  mobile?: boolean;
  token?: number;
}) => {
  const pathname = usePathname() as string;
  const router = useRouter();

  const handleAction = (action: TNavAction) => {
    if (action === "logout") return handleLogout();
    if (action === "notification") return handleNotification();
    if (action === "settings") return router.push("/settings");
    if (action === "support") {
      window.location.href = "mailto:Support@jobnest.io";
      return;
    }
    return null;
  };
  const handlePageChange = (link: string) => {
    router.push(link);
    if (mobile) callback();
  };
  const renderRoutes = useCallback(
    (route: TNavMenu) => {
      const { name, link, icon } = route;
      const isActive =
        (pathname !== "/" && link !== "/" && pathname.includes(link)) ||
        ((pathname === "/") && link === "/");
      return (
        <li className="text-14 cursor-pointer" key={name}>
          <div

            onClick={() => handlePageChange(link)}
            className={`flex items-center rounded-none md:rounded-lg gap-3 py-3 w-auto pl-5 truncate transition-all duration-150 ${isActive
                ? " text-black bg-white"
                : "text-white hover:bg-slate-100 hover:text-black"
              }
  ${mobile
                ? isActive
                  ? "border-l-2 border-white bg-white"
                  : "text-black hover:bg-white hover:text-black "
                : ""
              }`}
          >
            <img src={icon} className="w-6" alt="icons" />
            <span
              className={`transition-all duration-150 ${mobile && "text-18"}`}
            >
              {name}
            </span>
          </div>
        </li>
      );
    },
    [pathname]
  );

  const renderActions = useCallback((btns: TNavMenuButtons) => {
    const { name, icon, action } = btns;
    return (
      <li
        onClick={() => handleAction(action)}
        className="text-14 cursor-pointer"
        key={name}
      >
        <span
          className={`flex items-center rounded-lg gap-3 py-3 w-auto pl-5 truncate transition-all duration-150 
                ${mobile
              ? "text-white"
              : "text-white hover:bg-slate-100 hover:text-black"
            }
                  `}
        >
          <img src={icon} className="w-6" alt="icons" />
          <span
            className={`transition-all duration-150 ${mobile && "text-18"}`}
          >
            {name}
          </span>
        </span>
      </li>
    );
  }, []);

  return (
    <div className="px-2 h-full flex flex-col">
      {mobile && (
        <div className="text-white w-fit ml-auto p-2" onClick={callback}>
          <span>icon here</span>
        </div>
      )}
      <div className="mt-3 flex justify-start md:justify-between w-full h-auto">
        <Link href={`/`} className=" relative">
          <Image
            src={"/img/logo.png"}
            alt="logo"
            width={120}
            height={120}
          />
        </Link>
       
        <img src="/img/grid.png" alt="grid-icon" width={30} height={20} />
      </div>
      {mobile && (
        <div className="flex items-center justify-end gap-12 mt-6">
          <div className=" flex items-center gap-4">
            <div className=" flex flex-col  gap-2">
              <span className=" w-10 h-10 rounded-full font-semibold bg-white text-deep-blue flex items-center justify-center">
                AA
              </span>
              <p className=" flex flex-col text-white text-14">
                <span>Tolu</span>
                <span className=" text-white">digittol@gmail.com</span>
              </p>
            </div>
          </div>

        </div>
      )}
      <div className="flex-grow overflow-y-auto flex flex-col gap-32 mt-9">
        <ul className=" flex flex-col gap-4 list-none">
          {DashBoardUpperNavs.map(renderRoutes)}
        </ul>

        <ul className=" flex flex-col gap-2 list-none">
          {DashBoardLowerNavs.map(renderActions)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
