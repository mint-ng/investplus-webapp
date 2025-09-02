import Image from "next/image";
import Logo from "@/public/Mintynn.png";
import Fintech from "@/public/InvestPulse.png";
import LoginForm from "@/components/Login/LoginForm";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-main">
      <div className="w-full h-[80px] bg-white flex justify-center items-center overflow-y-auto">
        <Image src={Logo} alt="Mintyn logo" width={135} height={53} />
      </div>
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
            <Button href="sign" intent="link">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
