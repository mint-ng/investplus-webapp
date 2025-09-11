import React from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import Check from "@/public/tick-circle.png"

type SuccessProp = {
    show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  message?: string;
    
}

export default function SuccessModal({show, onClose, onSuccess, message}:SuccessProp) {
  return (
    <Modal
            show={show}
            onClose={onClose}
            size="sm"
          heading=""
          closeIcon={false}
          footerElement={
                <Button intent="primary" className='w-full' onClick={onSuccess}>Next</Button>
                  
            }
        >
            <div className="w-full text-center">
                <p className="max-w-[385px] mx-auto text-[#00000080] text-base font-medium flex justify-center mb-5">
                  <Image src={Check} alt="check" width={48} height={48}/>
                </p>
                <p className="max-w-[385px] mx-auto text-[#111827] text-base font-semibold mb-5">
                    Successful
                </p>
                <p className="max-w-[385px] mx-auto text-[#111827] text-base font-medium">
                  {message ?? "Your OTP has been successfully verified. Click Next to proceed."}
                </p>
            </div>
        </Modal>
  )
}