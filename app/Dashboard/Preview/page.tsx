"use client"
import React from 'react'
import Arrow from "@/public/left.svg"
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";
export default function Preview() {
    const router = useRouter();
     const searchParams = useSearchParams();
    const referral = searchParams.get("referral");
    console.log(referral)
  return (
      <>
         <div className='flex gap-1 mt-6 cursor-pointer' onClick={() => router.push("/Dashboard/Create")}>
          <Arrow />
          <p>Back to investment</p>
          </div> 
          <h1>eten</h1>
    </>
  )
}
