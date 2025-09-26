import React, { useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { enableIdle } from "@/app/redux/features/user-slice";

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
      heading="Pending Confirmation"
      footerElement={
        <Button
         intent="primary" className='w-full'
          onClick={() => {
            onClose();
            router.push("/Dashboard");
          }}
        >
          Okay
          </Button>
      }
    >
      <p className="text-sm text-gray-600">
        Your payment is currently under confirmation. Your investment will be updated accordingly once confirmed.
      </p>
    </Modal>
  );
};

export default PendingConfirmationModal;
