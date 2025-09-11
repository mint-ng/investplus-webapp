"use client"
import * as yup from "yup"
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import { useState } from "react";
import BvnModal from "./BvnModal";

type Props = {
    onSuccess: (sessionId: string) => void;
};

const formValidationSchema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required'),
});

export default function SignUp({onSuccess}:Props) {
    const[showBvnModal, setShowBvnModal] = useState(false)
    const initialFormValues = {
		phoneNumber: "",
    };
    return (
      <>
          <Formik
              initialValues={initialFormValues}
              validationSchema={formValidationSchema}
              onSubmit={() => {
          setShowBvnModal(true);
        }}
          >
              {({ values, errors, touched, handleSubmit, handleChange }) => ( 
                  <form
                      className="max-w-[497px] mx-auto mt-[94px] text-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                  }}
                        
              >
                  <h2 className="mb-[44px] text-3xl font-semibold">Sign Up to Mintyn InvestPulse</h2>
                      <CustomInput
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          onChange={handleChange}
                          error={(touched.phoneNumber && errors.phoneNumber) || undefined}
                          value={values.phoneNumber}
                          name="phoneNumber"
                          className="mb-6"
                          phone={true}
                      />
  
                      <Button
                        // type="submit"
                            className="mt-4 w-full"
                    >
                        Proceed
                        </Button>
                         <div className="flex items-center justify-center gap-1 mt-3">
                        <span>Already have an account?</span>
                        <Button href="/" intent="link">
                        Sign in
                        </Button>
                    </div>
                <BvnModal
                show={showBvnModal}
                onClose={() => setShowBvnModal(false)}
                phoneNumber={values.phoneNumber ? `234${values.phoneNumber}` : ""}
                onSuccess={onSuccess}
            />
                  </form>
                  
              )}
           </Formik>
          </>
    )
}
