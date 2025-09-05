import Image from "next/image";
import Fintech from "@/public/InvestPulse.png";
import LoginForm from "@/components/Login/LoginForm";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header"
export default function Home() {
  return (
    <div className="min-h-screen bg-main">
      <Header />
      <div className=" w-full h-full flex justify-center items-center mt-[94px] px-3 sm:px-0">
        <div className="max-w-[497px]">
          <p className="sm:text-3xl text-lg font-semibold mb-[44px] text-center">
            Welcome to Mintyn InvestPulse
          </p>
          <Image src={Fintech} alt="Investment picture" />
          <p className="text-center font-normal text-base my-[40px]">
            Please enter your details to sign in
          </p>
          <LoginForm />
          <div className="w-full flex justify-center items-center gap-5 flex-col my-[44]">
            <div className="flex items-center gap-1">
              <span>Don't have an account?</span>
              <Button href="sign" intent="link">
                Sign Up
              </Button>
            </div>
            <Button href="support" intent="link">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
