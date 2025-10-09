"use client";
import { IdleTimerProvider } from "react-idle-timer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { INVESTMENT_USER_TOKEN } from "@/constants";
import ExpiredModal from "@/components/SessionModal/SessionModal";
import { useAppSelector } from "./redux/features/use-store";
export function IdleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { idleActive } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const token = Cookies.get(INVESTMENT_USER_TOKEN);
  const isLoggedIn = Boolean(token);

  const handleOnIdle = () => {
    if (!isLoggedIn || !idleActive) return;
    setShowModal(true);
    Cookies.set("sessionExpired", "true", { path: "/" });
  };

  const handleLogout = () => {
    Cookies.remove(INVESTMENT_USER_TOKEN);
    Cookies.remove("sessionExpired");
    setShowModal(false);
    router.push("/");
    };
    
     useEffect(() => {
    if (Cookies.get("sessionExpired") === "true") {
      handleLogout();
    }
  }, []);

  return (
    <IdleTimerProvider
      // timeout={1000 * 60 * 1}
      timeout={1000 * 20}
      onIdle={handleOnIdle}
      debounce={500}
      disabled={!idleActive}
    >
      {children}

      {showModal && 
        <ExpiredModal 
         show={showModal}
         Logout={handleLogout}
         onClose={handleLogout}
        />
      }
    </IdleTimerProvider>
  );
}
