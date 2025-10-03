import React from 'react'
import Modal from '@/components/Modal/Modal'

type SuccessfulTransferModalProps = {
  show: boolean
  onClose: () => void
}

const SuccessfulTransferModal = ({ show, onClose }: SuccessfulTransferModalProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      closeIcon={false}
      shouldCloseOnOverlayClick={false}
      size="sm"
    >
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        {/* Message */}
        <p className="text-center text-sm text-black font-medium">
          We’re waiting to receive your transfer,<br />this can take up to 2 minutes
        </p>

        <div className="flex items-center space-x-6">
          {/* Sent */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              {/* Checkmark icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mt-2 text-green-500 text-sm">Sent</span>
          </div>

          {/* Progress bar (fully green now) */}
          <div className="w-24 h-1 bg-green-500 rounded-full"></div>

          {/* Received */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              {/* Checkmark icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mt-2 text-green-500 text-sm">Received</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SuccessfulTransferModal
