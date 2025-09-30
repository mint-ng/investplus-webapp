import React, { useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { enableIdle } from "@/app/redux/features/user-slice";
import Icon from "@/public/info-circle.svg"
type Props = {
  show: boolean;
  onClose: () => void;
};

const PendingConfirmationModal = ({ show, onClose }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      dispatch(enableIdle());
    }
  }, [show, dispatch]);

  return (
    <Modal
      show={show}
      shouldCloseOnOverlayClick={false}
      onClose={onClose}
      closeIcon={false}
      size="sm"
      heading=""
      footerElement={
        <Button
          intent='secondary'
          className="w-full bg-[#FDF6E7] text-[#C89B00] font-medium"
          onClick={() => {
            onClose();
            router.push("/Dashboard");
          }}
        >
          Okay
          </Button>
      }
    >
      <div className="flex flex-col items-center text-center space-y-4">
      <Icon/>
      <p className="text-sm text-gray-600">
        Your payment is being reviewed. Once confirmed, your investment will be updated accordingly. Our team is also monitoring this transaction to ensure accuracy
        </p>
        </div>
    </Modal>
  );
};

export default PendingConfirmationModal;
