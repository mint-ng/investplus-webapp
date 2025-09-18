import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import Copy from "@/public/copy.svg"
import { toast } from 'react-toastify';

type ActivateInvestmentModalProps = {
  show: boolean
  onClose: () => void
  onSuccess?: () => void
}

const FundModal = ({ show, onClose, onSuccess }: ActivateInvestmentModalProps) => {
  const [timer, setTimer] = useState(1800) // 30 minutes countdown

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard!");
  }).catch(() => {
    toast.error("Failed to copy!");
  });
}


  return (
    <Modal
      show={show}
      onClose={onClose}
      size="sm"
      heading="Activate Investment"
      footerElement={
        <Button intent='secondary' onClick={onSuccess} className="w-full bg-[#FDF6E7] text-[#C89B00] font-medium">
          I have funded
        </Button>
      }
    >
      <div className="w-full">
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-500">To activate Interest, please transfer the exact amount to the account below within</span>
          <span className="text-[#F5A623] font-semibold">{formatTime(timer)}</span>
        </div>

        <div className="bg-[#F9F9F9] border rounded-xl px-4 py-4 space-y-4">
          <div>
            <p className="text-xs text-gray-500">Bank</p>
            <p className="font-medium">Mint-Finnex MFB</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Account Name</p>
              <p className="font-medium">MINT INVESTMENT INTEREST LIABILITY ACCOUNT</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Account Number</p>
              <p className="font-medium">2700021782</p>
            </div>
            <button className='cursor-pointer' onClick={() => copyToClipboard('2700021782')}>
              <Copy />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-medium">NGN 200,000</p>
            </div>
            <button className='cursor-pointer' onClick={() => copyToClipboard('200000')}>
              <Copy />
            </button>
          </div>

          <p className="text-xs text-[#F64E60]">⚠ Please transfer exact amount to avoid failure</p>
        </div>
      </div>
    </Modal>
  )
}

export default FundModal
