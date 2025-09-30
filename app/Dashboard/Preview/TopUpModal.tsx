"use client";
import * as yup from "yup";
import { Formik } from "formik";
import React from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import CustomInput from "@/components/CustomInput/CustomInput";

type TopUpModalProps = {
  show: boolean;
  onClose: () => void;
  amount?: number;
  onSubmit: (amount: number) => void;
};

export default function TopUpModal({ show, onClose, amount, onSubmit }: TopUpModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      size="sm"
      heading="Enter amount you would like to top up"
      footerElement={
        <TopupForm initialAmount={amount} onSubmit={onSubmit} />
      }
    >
      <div className="w-full">
       
      </div>
    </Modal>
  );
}

function TopupForm({
  initialAmount,
  onSubmit,
}: {
  initialAmount?: number;
  onSubmit: (amount: number) => void;
}) {
  const formValidationSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Amount must be greater than zero")
      .required("Enter an amount"),
  });

  const initialFormValues = {
    amount: initialAmount ? String(initialAmount) : "", // ✅ blank instead of 0
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(values) => {
        onSubmit(Number(values.amount));
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form
          className="w-full py-0"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <CustomInput
            label="How much would you like to top up?"
            placeholder="Enter an amount"
            error={(touched.amount && errors.amount) || undefined}
            value={
    values.amount
      ? `₦${Number(values.amount).toLocaleString("en-NG")}`
      : ""
  }
            name="amount"
            onChange={(e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // only digits
    if (rawValue.length <= 11) {
      handleChange({
        target: { name: "amount", value: rawValue }, // keep raw number in Formik
      });
    }
  }}
          />

          <Button type="submit" className="mt-4 w-full">
            Proceed
          </Button>
        </form>
      )}
    </Formik>
  );
}
