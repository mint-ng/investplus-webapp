import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/public/mintyn.svg"
import dashboardRoutes from "../dashboard-route/dashboard-routes";
import Links from "./Links";
type Props = {
  isOpen: boolean;
  closeNav: () => void;
};

export default function Sidebar({ isOpen, closeNav }: Props) {
    const pathname = usePathname();

//      const onLogout = () => {
//     closeNav?.();
//     setTimeout(() => {
//       dispatch(deleteUserSession());
//       if (typeof window !== "undefined") window.history.replaceState(null, "", "/auth");
//     }, 0); // 200
//     // dispatch(deleteUserSession());
    //   };
    
    return (
    <>
      <nav
        data-transition="true"
        className={cn(`
			fixed lg:absolute overflow-y-hidden w-[280px] lg:w-[284px] [@media(min-width:1440px)]:w-[340px] [@media(min-width:1680px)]:w-[440px] top-0 lg:left-0 pt-8 ml-1 pb-20 px-4 lg:pr-[24.25px] lg:pl-5 [@media(min-width:1440px)]:pl-[51.95px] lg:pb-12 hide-scroll-bar lg:h-full flex flex-col
			lg:transition-none transition-[left] ease-in-out duration-[400ms] lg:min-h-[unset] min-h-full h-full z-[300] bg-white
					${isOpen ? "left-0" : "left-[-100%]"}
		`)}
      >
        <div className="w-fit h-fit block mx-auto">
          <Logo
            // className="lg:w-[139px] h-[50.04px] w-[129px] object-contain"
          />
        </div>

        <div className="w-full mt-8 bg-[#FAF5EB80] border-l-3 border-[#D1A23C]">
          <ul className="w-full flex flex-col gap-0 mt-4">
            {dashboardRoutes.map((parent, index) => {
              if (parent.isHidden) return null;

              return (
                <Links
                  key={index}
                  href={parent.path}
                  icon={parent.icon}
                  title={parent.title}
                  isActiveProps={
                    pathname.split("/").length > 2
                      ? `/${pathname.split("/")[1]}/${pathname.split("/")[2]}` === parent.path
                      : false
                  }
                />
              );
            })}
          </ul>
        </div>
      </nav>


    </>
  );

}