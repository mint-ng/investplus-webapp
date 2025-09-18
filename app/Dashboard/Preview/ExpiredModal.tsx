import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation';


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

type ExpiredModalProps = {
  show: boolean;
  paymentData: PaymentData;
  onGenerateNew: () => void;
};

const ExpiredModal = ({ show, paymentData, onGenerateNew }: ExpiredModalProps) => {
    const router = useRouter();
     const handleGenerateNew = () => {
    router.push('/Dashboard/Create');
  };
  return (
    <Modal
      show={show}
      onClose={onGenerateNew}
      closeIcon={false}
      size="sm"
      heading={<span className="text-lg font-semibold text-black">Create Investment</span>}
      footerElement={
        <Button onClick={handleGenerateNew} className="w-full bg-[#FDF6E7] text-[#C89B00] font-medium" intent='secondary'>
          Generate new payment details
        </Button>
      }
    >
      <div className="text-sm text-gray-700">
        <p>
          Your session has expired <span className="text-red-500 font-semibold">00:00</span>, kindly generate new account details to fund your investment.
        </p>
      </div>

      <div className="bg-[#F9F9F9] border mt-4 rounded-xl px-4 py-4 space-y-4 text-sm">
        <div>
          <p className="text-xs text-gray-500">Bank</p>
          <p className="line-through text-black">{paymentData.bankName}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Account Name</p>
          <p className="line-through text-black">{paymentData.accountName}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Account Number</p>
          <p className="line-through text-black">{paymentData.accountNumber}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Amount</p>
          <p className="text-black font-medium">NGN {paymentData.amount.toLocaleString()}</p>
        </div>

        <p className="text-[#F64E60] text-xs">
          ⚠ Please transfer exact amount to avoid failure
        </p>
      </div>
    </Modal>
  );
};

export default ExpiredModal;
