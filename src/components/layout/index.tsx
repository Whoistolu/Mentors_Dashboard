"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page: FC<{ children: ReactNode }> = (props): JSX.Element => {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [isNottificationOpen, setIsNotificationOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [token, setToken] = useState<number | undefined>(undefined);
  const [logoutModal, setLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);


  const handleResize = () => {
    setSidebarOpen(window.innerWidth > 992);
    setIsMobile(window.innerWidth <= 992);
  };

  const handleLogout = () => {
    setLogoutModal(!logoutModal);
  };

  const LogoutUser = () => {
    router.push("/login");
    setTimeout(() => {
      console.log();
    }, 200);
  };

  const handleNotification = () => {
    setIsNotificationOpen(!isNottificationOpen);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen]);

  useEffect(() => { }, []);
  return (
    <>

        <main className=" relative">
          <Transition
            as={Fragment}
            show={sidebarOpen}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              ref={sidebarRef}
              className={`${isMobile ? "absolute" : "fixed"
                } z-50 w-56 h-screen bg-mentlyBlue  `}
            >
              <Sidebar
                callback={() => setSidebarOpen(!sidebarOpen)}
                token={token}
                mobile={isMobile}
                handleLogout={handleLogout}
                handleNotification={handleNotification}
              />
            </div>
          </Transition>
          <div
            className={`transition-all w-full z-10 duration-[400ms] ${
              sidebarOpen && !isMobile ? " pl-56" : ""
            }`}
          >
            <div className="relative h-screen flex flex-col pt-2">
              <div
                className="px-4 mt-4 block md:hidden w-fit"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
               <span>Icon here</span>
              </div>

              {/* search input  */}
              <div className="px-3">
                <div className=" relative mt-2 z-40 w-full bg-white rounded-lg px-3 py-3 h-24 flex items-center justify-between">
                  <span
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={` cursor-pointer bg-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg `}
                  >
                    <span>Icon here</span>
                  </span>
                 
              
                </div>
              </div>
              <div className=" flex-grow overflow-y-auto px-3 pt-4">
                {props.children}
              </div>
            </div>
          </div>
        </main>
      
    </>
  );
};

export default Page;
