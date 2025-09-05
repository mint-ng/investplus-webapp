"use client";
import Button from "@/components/Button/Button";
import { useState } from "react";
import OtpInput from "react-otp-input";
import SuccessModal from "@/components/Modal/SuccessModal/SuccessModal";

type Props = {
  onSuccess: () => void;
};

export default function VerifyOTP({onSuccess}:Props) {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  console.log(otp)
  return (
    <div className="max-w-[497px] mx-auto mt-[94px] text-center">
      <h2 className="text-[30px] font-semibold text-[#1E1E1E] mb-2">Kindly enter OTP</h2>
      <p className="text-[#00000080] mb-[40px]">An OTP has been sent to your phone <br/> number, Kindly enter below</p>

       <p className="mt-6 mb-3 text-sm font-medium text-gray-700">
        Enter 6-Digit OTP
      </p>

     <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="password"
        shouldAutoFocus
        containerStyle="flex justify-center gap-2" // flex container
        renderInput={(props) => (
          <input
            {...props}
            className="focus:outline-none focus:ring-0 focus:border-[#7E5730]"
          />
        )}
         inputStyle={{
          border: "1px solid transparent",
          borderRadius: "15px",
          width: "54px",
          height: "54px",
          fontSize: "12px",
          color: "#000",
          fontWeight: "400",
           caretColor: "blue",
          backgroundColor: "#EBECEF"
        }}
      />
      <Button className="mt-4 w-full" onClick={() => setShowSuccess(true)} disabled={otp.length !==6}> Verify</Button>
      <div className="flex items-center justify-center gap-1 mt-6">
        <span>Didn't get an OTP?</span>
        <Button href="sign" intent="link">
          Resend
        </Button>
      </div>
      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} onSuccess={onSuccess} />
    </div>
  )
}
