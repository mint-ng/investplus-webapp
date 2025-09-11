"use client"
import * as yup from "yup"
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import CustomPasswordInput from "@/components/CustomPasswordInput/CustomPasswordInput";
import {PASSWORD_REGEX } from "@/constants";
import Header from "@/components/Header/Header";

const formValidationSchema = yup.object().shape({
    password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least 8 characters, an uppercase, a lowercase, a special character, and a number"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export default function Page() {
     const initialFormValues = {
        password: "",
        confirmPassword: "",
        
    };
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
                <h2 className="mb-[14px] text-3xl font-semibold">Reset Password</h2>
                <p className="mb-5 text-sm sm:text-base">Create and confirm your passwords for a reset</p>
                        <CustomPasswordInput
                            label="New Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            name="password"
                            error={(touched.password && errors.password) || undefined}
                            className="my-6"
                            />
                
                     <CustomPasswordInput
                            label="Confirm New Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            name="confirmPassword"
                            error={(touched.confirmPassword && errors.confirmPassword) || undefined}
                            className="my-6"
                      />
                        <Button
                          type="submit"
                              className="my-9 w-full"
                      >
                          Update Password
                      </Button>
                    </form>
                    
                )}
             </Formik>
            </div>
      )
}
