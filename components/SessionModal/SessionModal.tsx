import React from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import Expired from "@/public/Expired.svg"

type SuccessProp = {
  show: boolean;
  onClose: () => void;
  Logout: () => void;
    
}

export default function ExpiredModal({show, onClose, Logout}:SuccessProp) {
  return (
    <Modal
        show={show}
        onClose={onClose}
        size="sm"
        heading=""
      closeIcon={false}
      shouldCloseOnOverlayClick={false}
          footerElement={
            <Button intent="primary" className='w-full' onClick={Logout}>Login</Button>
                  
            }
        >
            <div className="w-full text-center">
                <p className="max-w-[385px] mx-auto text-[#00000080] text-base font-medium flex justify-center mb-5">
                  <Expired width={48} height={48}/>
                </p>
                <p className="max-w-[385px] mx-auto text-[#111827] text-base font-semibold mb-5">
                    Session Timeout
                </p>
                <p className="max-w-[385px] mx-auto text-[#111827] text-base font-medium">
                  You have been inactive.
                </p>
            </div>
        </Modal>
  )
}