"use client"
import * as yup from "yup"
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import CustomPasswordInput from "@/components/CustomPasswordInput/CustomPasswordInput";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import Header from "@/components/Header/Header";

const formValidationSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Please use a valid email address")
        .matches(EMAIL_REGEX, "Please use a valid email address"),
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
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
export default function Page() {
     const initialFormValues = {
		email: "",
        password: "",
        confirmPassword: "",
        terms: false,
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
                <h2 className="mb-[14px] text-3xl font-semibold">Complete your profile</h2>
                <p className="mb-5">Just a few more details to get started</p>
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
                        <CustomPasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            name="password"
                            error={(touched.password && errors.password) || undefined}
                            className="my-6"
                            />
                
                     <CustomPasswordInput
                            label="Confirm Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            name="confirmPassword"
                            error={(touched.confirmPassword && errors.confirmPassword) || undefined}
                            className="my-6"
                      />
                      <div className="flex items-center gap-2 my-5">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
               className="
      w-5 h-5 
      appearance-none 
      border border-gray-400 
      rounded 
      bg-white 
      cursor-pointer 
      checked:bg-[#FFFFFF]   /* gold background when checked */
      checked:border-[#77502F] 
      checked:after:content-['✔'] 
      checked:after:text-[#C58940] 
      checked:after:block 
      checked:after:text-center 
      checked:after:leading-5
    "
              />
              <label htmlFor="terms" className="text-sm">
                By creating an account, you agree to{" "}
                <a
                  href="/terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C58940] underline"
                >
                  Mintyn's Terms & Conditions
                </a>
              </label>
            </div>
            {touched.terms && errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms}</p>
            )}
                        <Button
                          type="submit"
                          className="my-9 w-full"
                          disabled={!values.terms} 
                      >
                          Create Account
                      </Button>
                    </form>
                    
                )}
             </Formik>
            </div>
      )
}



 <div className="flex justify-center items-center gap-2" >
                      <p className="text-center my-5 text-sm">By creating an account, you agree to </p>
                          <a
                            href="/terms.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C58940] underline"
                            >
                            Mintyn's Terms & Conditions
                            </a>

                        </div>