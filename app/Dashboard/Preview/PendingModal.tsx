import React from 'react'
import Modal from '@/components/Modal/Modal'

type PendingTransferModalProps = {
  show: boolean
  onClose: () => void
}

const PendingTransferModal = ({ show, onClose }: PendingTransferModalProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      closeIcon={false}
      size="sm"
    >
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        <p className="text-center text-sm text-black font-medium">
          We’re waiting to receive your transfer,<br />this might take a while
        </p>

        <div className="flex items-center space-x-6">
          {/* Sent */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <span className="mt-2 text-green-500 text-sm">Sent</span>
          </div>

          {/* Progress bar */}
          <div className="w-24 h-1 bg-gray-200 relative">
            <div className="absolute top-0 left-0 h-1 bg-green-500 w-1/2"></div>
          </div>

          {/* Received */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-t-black border-gray-300 rounded-full animate-spin"></div>
            </div>
            <span className="mt-2 text-gray-400 text-sm">Received</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PendingTransferModal
