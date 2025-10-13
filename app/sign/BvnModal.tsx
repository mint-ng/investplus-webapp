"use client"
import * as yup from "yup"
import { Formik } from "formik";
import React, {useState} from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import CustomInput from '@/components/CustomInput/CustomInput'
import { BVN_REGEX } from '@/constants'
import GetOtp from "../apis/mutations/use-otp";

type BvnProp = {
	show: boolean;
	phoneNumber?: string;
	onClose: () => void
	onSuccess?: (sessionId: string) => void;
    
}
export default function BvnModal({ show, phoneNumber, onClose, onSuccess }: BvnProp) {
	const [conflictMessage, setConflictMessage] = useState("");
	const [showConflict, setShowConflict] = useState(false);

	const closeConflict = () => {
    setShowConflict(false)
    setConflictMessage("")
	}
	
	return (
	  <>
    <Modal
			show={show && !showConflict}
			onClose={onClose}
			size="sm"
			heading="BVN"
			footerElement={
				<BvnForm phoneNumber={phoneNumber}
				onSuccess={onSuccess}
				onConflict={(message) => {
              // ✅ Clean up the message before displaying
              const cleanMessage = message.split("Link:")[0].trim()
              onClose()
              setConflictMessage(cleanMessage)
              setShowConflict(true)
            }}
				 />
			}
		>
			<div className="w-full">
				<p className="max-w-[385px] mx-auto text-[#00000080] text-base font-medium">
					Please ensure your BVN is linked to the provided phone number to securely connect your investment to your Mintyn account.
				</p>
			</div>
			</Modal>
			{/* CONFLICT MODAL */}
      <Modal
        show={showConflict}
        onClose={closeConflict}
        size="sm"
        heading="Account Already Exists"
        footerElement={
          <Button
            className="w-full"
            onClick={() => {
              window.open("https://app.mintyn.com/sign-in", "_blank")
              closeConflict()
            }}
          >
            Go to Mintyn App
          </Button>
        }
      >
        <div className="text-center text-[#00000080] font-medium px-2">
          {conflictMessage}
        </div>
      </Modal>
			</>
  )
}

function BvnForm({phoneNumber, onSuccess, onConflict}:{phoneNumber?:string, onSuccess?: (sessionId: string) => void;onConflict?: (message: string) => void}) {
	const formValidationSchema = yup.object().shape({
		bvn: yup
			.string()
			.trim()
			.required("BVN is required")
			.matches(BVN_REGEX, "Please use a valid bvn number")
	});

	const initialFormValues = {
		bvn: "",
	};
	const OtpMutation = GetOtp({ onSuccess, onConflict })

	return (
			<Formik
				initialValues={initialFormValues}
				validationSchema={formValidationSchema}
			onSubmit={(values) => OtpMutation.mutate({
				bvn: values.bvn,
				phoneNumber: phoneNumber ?? "",
				})}
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
							label="Enter BVN"
							placeholder="Enter your BVN"							
							error={(touched.bvn && errors.bvn) || undefined}
							value={values.bvn}
						    name="bvn"
						    onChange={(e) => {
							const value = e.target.value.replace(/\D/g, "");
							if (value.length <= 11) {
							handleChange({
								target: { name: "bvn", value }
							});
							}
						}}
						maxLength={11}
						/>
	
						<Button
							type="submit"
						className="mt-4 w-full"
						loading={OtpMutation.isPending || OtpMutation.isSuccess}
						>
							Send OTP
						</Button>
					</form>
				)}
	
	
			</Formik>
		)
}