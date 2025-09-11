"use client"
import * as yup from "yup"
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { EMAIL_REGEX } from "@/constants";
import Sms from "@/public/sms.png";
import Image from "next/image";
import Header from "@/components/Header/Header";

const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Email is required")
      .email("Please use a valid email address")
      .matches(EMAIL_REGEX, "Please use a valid email address")
});

export default function Page() {
  const [showBvnModal, setShowBvnModal] = useState(false);
  const [success, setSuccess] = useState(false);
    const initialFormValues = {
		email: ""
  };
  
  if (success) return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <Image src={Sms} alt="sms logo" width={56} height={56} />
      <h2 className="text-[#111827] font-semibold text-[24px]">Check your mail</h2>
      <p className="mt-3 text-center">We have sent a verification link to femikehinde@gmail.com to activate your account</p>
    </div>
  )
    return (
        <div className='min-h-screen bg-main'>
            <Header />
          <Formik
              initialValues={initialFormValues}
              validationSchema={formValidationSchema}
              onSubmit={(values)=>console.log(values)}
          >
              {({ values, errors, touched, handleSubmit, handleChange }) => ( 
                  <form
                      className="max-w-[497px] mx-auto mt-[94px] text-center px-3 sm:px-0"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                  }}
                        
              >
              <h2 className="mb-[14px] text-3xl font-semibold">Forgot Password</h2>
              <p className="mb-5">Please enter your registered Email address</p>
                  
                    <CustomInput
                      label="Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      onChange={handleChange}
                      error={(touched.email && errors.email) || undefined}
                      value={values.email}
                      name="email"
                      className="mb-6"
                       />
  
                      <Button
                        // type="submit"
                            className="my-9 w-full"
                            onClick={()=>setSuccess(true)}
                    >
                        Send Reset Link
                    </Button>
                  </form>
                  
              )}
           </Formik>
          </div>
    )
}
