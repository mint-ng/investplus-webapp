import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/redux/features/use-store";

type Props = {
  isOpen: boolean;
  closeNav: () => void;
  className?: string;
};

export default function DashboardHeader({ isOpen, closeNav, className }: Props) {
  const { userName } = useAppSelector((state) => state.user);
//   const profileRef = React.useRef<HTMLDivElement | null>(null);
//   const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    //   const dispatch = useAppDispatch();
    
    return (
    <>
      <header
        role="banner"
        id="dashboard-header"
        className={cn(
          "h-[100px] w-full z-[150] sticky top-0 left-0 lg:pl-[300px] [@media(min-width:1440px)]:pl-[360px] [@media(min-width:1680px)]:pl-[420px] bg-[#F6F6F6]",
          className,
        )}
      >
        <div
          id="dashboard-header-inner-container"
          className="dashboard-wrapper flex items-center justify-between h-full gap-3 pr-2 relative"
        >
          <p className="text-[15px] max-w-[140px] sm:max-w-[unset] sm:text-lg md:text-xl [@media(min-width:1440px)]:text-[22px] font-medium text-[#1E1E1E]">
              Welcome, {userName} <br />
              <span className="text-[#8C8F96] text-[16px] font-medium">Track your Investments and analyze your returns</span>
          </p>


          <div className="w-fit flex sm:gap-8 gap-4 items-center">

            {/* <div ref={profileRef} className="w-fit">
              <div className="w-fit relative">
                <button
                  className="w-fit h-fit flex items-center gap-2 justify-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    const dropdownMenu = e.currentTarget.nextElementSibling;
                    const dropdownIcon = e.currentTarget.querySelector("svg");
                    if (dropdownMenu) {
                      dropdownMenu.classList.toggle("!h-[83px]");
                      dropdownMenu.classList.toggle("show-dashboard-profile-dropdown-menu");
                    }
                    if (dropdownIcon) dropdownIcon.classList.toggle("rotate-[180deg]");
                  }}
                >
                  <ProfilePicture
                    name={userData.firstname + " " + userData.lastname}
                    imageUrl={userData?.profileImage || ""}
                    className="xl:w-10 xl:h-10 w-8 h-8"
                    initialsClassName="xl:text-base text-sm"
                  />
                  <span className="text-[15px] sm:text-base font-medium text-black text-ellipsis max-w-[60px] md:max-w-[unset] overflow-clip">
                    {userData.firstname} {userData.lastname}
                  </span>
                  <ChevronDownIcon
                    id="nav-profile-dropdown-icon"
                    className="w-[10px] h-[10px] [@media(min-width:1440px)]:w-[11px] [@media(min-width:1440px)]:h-[11px] flex-shrink-0 transition-all duration-[0.3s] ease-in-out"
                  />
                </button>
                <div
                  id="nav-profile-dropdown"
                  data-transition="true"
                  className="absolute right-0 opacity-0 invisible pointer-events-none transition-all duration-[0.3s] ease-in-out z-[290] h-0 pt-0"
                >
                  <div className="min-w-[200px] xl:min-w-[250px] h-auto bg-white p-6 shadow-[0_0_15px_0_rgba(0,0,0,0.15)] rounded-xl mt-0 flex flex-col gap-[19px]">
                    <ProfileDropdownLinks
                      links={profileDropdownLinks}
                      onClick={closeDropdown}
                      onLogout={() => setShowLogoutModal(true)}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

      </header>

    </>
  );

}