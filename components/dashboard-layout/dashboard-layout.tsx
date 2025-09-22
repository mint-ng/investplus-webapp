"use client"
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HamburgerOpen from "@/public/burger-menu-right-svgrepo-com.svg"
import HamburgerClose from "@/public/icons8-close-window-50.png";
import Image from "next/image";
import DashboardHeader from "../dashboard-header/dashboard-header";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) { 
    const [showSidebar, setShowSidebar] = React.useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function closeNav() {
    document.body.setAttribute("style", "");
    setShowSidebar(false);
    }
    
    React.useEffect(() => {
    const layout = document.getElementById("page-layout");
    if (layout) {
      layout.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
    setShowSidebar(false);
    document.body.setAttribute("style", "");
    return () => document.body.setAttribute("style", "");
    }, [pathname, searchParams]);
    
     return (
    <div id="page-layout" className="w-full lg:h-screen overflow-visible lg:overflow-scroll">
      <DashboardHeader isOpen={showSidebar} closeNav={closeNav} />

      <Sidebar isOpen={showSidebar} closeNav={closeNav} />

      <main
        role="main"
        id="dashboard"
        className="lg:pl-[330px] [@media(min-width:1440px)]:pl-[400px] [@media(min-width:1680px)]:pl-[480px] pt-3 pb-10 bg-[#F6F6F6] min-h-[calc(100vh-100px)]"
      >
        {children}
      </main>

      <div
        className={`lg:hidden fixed w-full h-full bg-[rgba(0,0,0,0.7)] z-[200] top-0 left-0 bottom-0 right-0 transition-all ease-in-out duration-[400ms]
				 ${showSidebar ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"}`}
        onClick={closeNav}
      ></div>

      <div className="lg:hidden flex items-center justify-center fixed top-[70px] right-4 z-[301]">
        <button
          className="bg-transparent border-none w-fit h-fit p-0 min-w-[auto] min-h-[auto] relative"
          onClick={() => {
            if (!showSidebar) {
              document.body.style.touchAction = "none";
              document.body.style.overflow = "hidden";
              document.body.style.overscrollBehavior = "none";
            } else {
              document.body.setAttribute("style", "");
            }
            setShowSidebar(!showSidebar);
          }}
        >
                     {showSidebar ?
                         <Image src={HamburgerClose}
                             alt='hamburger close'
                             className="w-9 h-9" />
                         :
                         <HamburgerOpen className="w-9 h-9"/>}
        </button>
      </div>
    </div>
  );
}

