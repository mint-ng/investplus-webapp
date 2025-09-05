"use client"
import * as yup from "yup"
import { Formik } from "formik";
import React from 'react'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import CustomInput from '@/components/CustomInput/CustomInput'
import { BVN_REGEX } from '@/constants'

type BvnProp = {
    show: boolean;
    onClose: ()=>void
    
}
export default function BvnModal({show, onClose}:BvnProp) {
  return (
    <Modal
			show={show}
			onClose={onClose}
			size="sm"
			heading="BVN"
			footerElement={
				<BvnForm />
			}
		>
			<div className="w-full">
				<p className="max-w-[385px] mx-auto text-[#00000080] text-base font-medium">
					Please ensure your BVN is linked to the provided phone number to securely connect your investment to your Mintyn account.
				</p>
			</div>
		</Modal>
  )
}

function BvnForm() {
	const formValidationSchema = yup.object().shape({
		bvn: yup
			.string()
			.trim()
			.required("BVN is required")
			.matches(BVN_REGEX, "Please use a valid bvn number")
	});

	const initialFormValues = {
		bvn: ""
	};
	return (
			<Formik
				initialValues={initialFormValues}
				validationSchema={formValidationSchema}
				onSubmit={(values)=>console.log(values)}
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
						>
							Send OTP
						</Button>
					</form>
				)}
	
	
			</Formik>
		)
}