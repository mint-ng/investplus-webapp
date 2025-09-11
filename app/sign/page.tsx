"use client"
import { useState } from "react";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOTP";
import MoreSteps from "./MoreSteps";
import Header from "@/components/Header/Header";

const MIN_STEP: number = 0;
const MAX_STEP: number = 2;

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(Number(MIN_STEP));
  const [sessionId, setSessionId] = useState('');

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, MAX_STEP));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, MIN_STEP));
  };

      const renderViewBasedOnStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <SignUp 
               onSuccess={(sessionId: string) => {
              setSessionId(sessionId);
              goToNextStep();
            }}
        
            />
          </>
        );

      case 1:
        return (
          <>
            <VerifyOTP
              onSuccess={goToNextStep}
              sessionId={sessionId}
            />
          </>
        );

      case 2:
        return <MoreSteps sessionId={sessionId}/>;

      default:
        return null;
    }
  };

  return (
      <div className='min-h-screen bg-main'>
      <Header />
      <>
        {renderViewBasedOnStep()}
      </> 
      </div>
  )
}
