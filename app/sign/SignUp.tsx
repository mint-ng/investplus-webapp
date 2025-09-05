"use client"
import * as yup from "yup"
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import { useState } from "react";
import BvnModal from "./BvnModal";

const formValidationSchema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required'),
});

export default function SignUp() {
    const[showBvnModal, setShowBvnModal] = useState(false)
    const initialFormValues = {
		phoneNumber: "",
    };
    return (
      <>
          <Formik
              initialValues={initialFormValues}
              validationSchema={formValidationSchema}
              onSubmit={(values)=>console.log(values)}
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
                            onClick={()=>setShowBvnModal(true)}
                    >
                        Proceed
                    </Button>
                  </form>
                  
              )}
           </Formik>
            <BvnModal
                show={showBvnModal}
                onClose={()=>setShowBvnModal(false)}
            />
          </>
    )
}
