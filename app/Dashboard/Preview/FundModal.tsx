import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import Copy from "@/public/copy.svg"
import { toast } from 'react-toastify';
import ExpiredModal from './ExpiredModal';
import { useCheckFunding } from '@/app/apis/mutations/queries/get-funded';
import PendingTransferModal from './PendingModal';
import SuccessfulTransferModal from './SuccessfulTransferModal';
import { useRouter } from "next/navigation";
import { enableIdle, disableIdle } from '@/app/redux/features/user-slice';
import { useDispatch } from "react-redux";

type PaymentData = {
  paymentReference: string;
  amount: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  createdDate: string;
  expiryTime: string;
  status: string;
};

type ActivateInvestmentModalProps = {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  paymentData: PaymentData;
  fromDashboard:boolean
}

const FundModal = ({ show, onClose, onSuccess, fromDashboard, paymentData }: ActivateInvestmentModalProps) => {
  const [timer, setTimer] = useState(Number(paymentData.expiryTime));
  const [expired, setExpired] = useState(false);
  const { mutate: checkFundingMutate } = useCheckFunding();
  const [loading, setLoading] = useState(false);
  const [fundingStatus, setFundingStatus] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
  if (fundingStatus === "PENDING") {
    dispatch(disableIdle());
  } else if (fundingStatus === "SUCCESSFUL") {
    dispatch(enableIdle());
  }
}, [fundingStatus, dispatch]);


  useEffect(() => {
    if (show) {
      setTimer(Number(paymentData.expiryTime))
    }
  }, [show, paymentData.expiryTime]);

  useEffect(() => {
  if (!show) return;
  if (timer <= 0) {
    setExpired(true);
    return;
  }

  const interval = setInterval(() => {
    setTimer(prev => (prev > 0 ? prev - 1 : 0));
  }, 1000);

  return () => clearInterval(interval);
  }, [show, timer]);
  
   useEffect(() => {
  if (fundingStatus !== "PENDING") return;

  const interval = setInterval(() => {
    checkFundingMutate(
      { reference: paymentData.paymentReference },
      {
        onSuccess: (res) => {
          const status = res?.data?.status || res?.status;
          if (status === "SUCCESSFUL") {
            setFundingStatus("SUCCESSFUL");
            toast.success("Funding confirmed!");

            clearInterval(interval);

            setTimeout(() => {
              router.push("/Dashboard");
            }, 2000);
          }
        },
      }
    );
  }, 4000); // poll every 4 seconds

  return () => clearInterval(interval);
}, [fundingStatus, checkFundingMutate, paymentData.paymentReference, router]);


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
  
  function Back() {
  if (fromDashboard) {
    router.push("/Dashboard");
  } else {
    onClose();
  }
}

console.log(fromDashboard)

  return (
    <>
    <Modal
      show={show}
      shouldCloseOnOverlayClick={!fromDashboard}
      onClose={Back}
      closeIcon={fromDashboard}
      size="sm"
      heading={
    <div className="flex justify-between items-center w-full gap-20">
      <h2 className="text-lg font-semibold text-black">Activate Investment</h2>
      <span className="text-green-600 font-medium text-sm">Pay NGN {paymentData.amount.toLocaleString()}</span>
    </div>
  }
      footerElement={
        <Button
          intent='secondary'
          loading={loading}
          onClick={() => {
              setLoading(true);
    checkFundingMutate(
      { reference: paymentData.paymentReference },
      {
         onSuccess: (res) => {
      const status = res?.data?.status;
      setFundingStatus(status);

      if (status === "SUCCESS") {
        toast.success("Funding confirmed!");
        onSuccess?.();
      }
    },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Funding not confirmed yet");
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  }}
          className="w-full bg-[#FDF6E7] text-[#C89B00] font-medium">
          I have funded
        </Button>
      }
    >
      <div className="w-full">
       <div className="text-sm mb-4">
  <span className="text-gray-500">
    To activate Interest, please transfer the exact amount to the account below within{" "}
    <span className="text-[#F5A623] font-semibold">{formatTime(timer)}</span>
  </span>
</div>


        <div className="bg-[#F9F9F9] border rounded-xl px-4 py-4 space-y-4">
          <div>
            <p className="text-xs text-gray-500">Bank</p>
            <p className="font-medium">{paymentData.bankName}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Account Name</p>
              <p className="font-medium">{paymentData.accountName}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Account Number</p>
              <p className="font-medium">{paymentData.accountNumber}</p>
            </div>
            <button className='cursor-pointer' onClick={() => copyToClipboard((String(paymentData.accountNumber)))}>
              <Copy />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-medium">{paymentData.amount}</p>
            </div>
            <button className='cursor-pointer' onClick={() => copyToClipboard(String(paymentData.amount))}>
              <Copy />
            </button>
          </div>

          <p className="text-xs text-[#F64E60]">⚠ Please transfer exact amount to avoid failure</p>
        </div>
      </div>
      </Modal>
    <ExpiredModal
    show={expired}
    paymentData={paymentData}
    onGenerateNew={() => {
      setExpired(false);
      onClose(); // or trigger a refetch for new payment details
    }}
      />
     {/* PENDING Modal */}
      <PendingTransferModal
        show={show && fundingStatus === "PENDING"}
        onClose={onClose}
      />

      {/* SUCCESSFUL Modal */}
      <SuccessfulTransferModal
        show={show && fundingStatus === "SUCCESSFUL"}
        onClose={() => {
          setFundingStatus(null);
          onClose();
        }}
      />
    </>
  )
}

export default FundModal
