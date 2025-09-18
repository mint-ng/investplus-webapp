"use client"
import React, { useState } from 'react'
import Arrow from "@/public/left.svg"
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { fundInvestment } from '@/app/apis/mutations/get-fund-investment';
import { toast } from "react-toastify";
import { useMutation } from '@tanstack/react-query';
import FundModal from './FundModal';

export default function Preview() {
    const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataParam = searchParams.get("data"); // the serialized string
let investmentData: any = null;

if (dataParam) {
  try {
    const parsed = JSON.parse(decodeURIComponent(dataParam));
    investmentData = parsed.data; // now this is your actual data object
  } catch (err) {
    console.error("Failed to parse investment data", err);
  }
  }
  
  const mutation = useMutation({
  mutationFn: () =>
    fundInvestment({ investmentCode: investmentData.id }),
  onMutate: () => {
    setLoading(true);
  },
  onSuccess: (res) => {
    setLoading(false);
    toast.success("Investment funded successfully!");
    setShowModal(true);
    // router.push("/Dashboard");
  },
  onError: (err: any) => {
    setLoading(false);
    toast.error(err?.response?.data?.message || "Funding failed");
  },
});


  return (
      <>
         <div className='flex gap-1 mt-6 cursor-pointer' onClick={() => router.push("/Dashboard/Create")}>
          <Arrow />
          <p>Back to investment</p>
          </div>
      <div className="w-full h-full flex flex-col justify-center items-center mt-[34px] px-3 sm:px-0">
                <h2 className='text-[20px] font-medium text-[#000000]'>Preview Investment</h2>
                <p className='text-[14px] max-w-[350px] text-center'>Always take a moment to review. Double-check your data before moving forward.</p>
                <div className="max-w-[600px] bg-white rounded-b-lg overflow-hidden shadow-lg rounded-b-xl">
                         <Image
                            src="/preview.png"
                            alt="Summary picture"
                            width={600} 
                            height={300} 
                            className="w-full h-auto object-cover block"
                  />
                  <div className='pl-9 pt-8 pb-8'>
                    <div className='flex flex-col gap-1 mb-3'>
                      <h3 className='text-[14px]'>
                        Duration category
                      </h3>
                       {investmentData?.durationCategory} @ {investmentData?.interestRate}% per annum
                    </div>
                    <div className='flex flex-col gap-1 my-3'>
                      <h3 className='text-[14px]'>
                        Amount Invested
                      </h3>
                      {investmentData?.amountInvested}
                    </div>
                    <div className='flex flex-col gap-1 my-3'>
                      <h3 className='text-[14px]'>
                        Investment Duration
                      </h3>
                       {investmentData?.durationInMonths} month(s)
                    </div>
                  {investmentData?.referralCode &&  <div className='flex flex-col gap-1 mb-8'>
                      <h3 className='text-[14px]'>
                        Referral Code
                      </h3>
                      {investmentData?.referralCode}
            </div>} 
            <div className="flex flex-col gap-1 mb-8">
              <h3 className="text-[14px]">Investor</h3>
              {investmentData?.investorName}
            </div>
            <div className='mb-6'>
              <Button
                className='my-9 w-[90%]'
                onClick={() => mutation.mutate()}
                loading={loading}
              >
              Fund Investment
            </Button>
            </div>
            {showModal && <FundModal show={showModal} onClose={() => setShowModal(false)} />}

                  </div>
                </div>
            </div> 
    </>
  )
}
