"use client"
import * as yup from "yup"
import { Formik } from "formik";
import React from 'react'
import Arrow from "@/public/left.svg"
import { useRouter } from 'next/navigation'
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import useTenors from "@/app/apis/mutations/queries/get-tenors";
import RedIcon from "@/public/red.svg"

type Tenor = {
  durationId: number;
  description: string;
  interestRate: number;
  penaltyRate: number;
  minimumDuration: number;
  maximumDuration: number;
};

const formValidationSchema = yup.object().shape({
    duration: yup
      .number()
      .required("Select a duration"),
    amount: yup
      .number()
      .required("Select an amount"),
    investDuration: yup
      .number()
      .required("Select an investment duration"),
    referral: yup
      .string()
      .trim()
        .required("Enter a referral code"),
    terms: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
});
export default function Create() {
    const router = useRouter();
    const { data: tenors, isLoading, isError } = useTenors();
    console.log(tenors)

      const initialFormValues = {
		duration: "",
		amount: "",
		investDuration: 0,
		referral: "",
        terms: false,
    };
    
  const tenorOptions =
  tenors?.map((t: Tenor) => {
    const min = t.minimumDuration;
    const max = t.maximumDuration;

    const durationText =
      min === max
        ? `${min} month${min > 1 ? "s" : ""}`
        : `${min}-${max} month(s)`;

      return {
      label: `${durationText} @ ${t.interestRate}% per annum, penalty: ${t.penaltyRate}% of accrued interest`,
      value: String(t.durationId),
    };
  }) || [];

    return (
      <>
      <div className='flex gap-1 mt-6 cursor-pointer' onClick={() => router.push("/Dashboard")}>
          <Arrow />
          <p>Dashboard</p>
            </div>
        
             <Formik
                initialValues={initialFormValues}
                validationSchema={formValidationSchema}
                 onSubmit={(values) => {
    router.push(`/Dashboard/Preview?referral=${values.referral}`);
  }}
                      >
                          {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => ( 
                              <form
                                  className="max-w-[550px] mt-[20px] bg-white p-8 rounded-lg shadow-lg"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                              }}
                                    
                          >
                        <h2 className="mb-[19px] text-[18px] font-semibold border-b-1 border-[#DFDFDF] pb-3">Create Investment</h2>
                             <CustomSelect
                                label="Duration Category"
                                options={tenorOptions}
                                value={values.duration}
                                onChange={(val) => setFieldValue("duration", val)}
                                placeholder="Select an option"
            />
                                    <CustomInput
                                      label="How much would you like to invest?"
                                      placeholder="Enter the amount"
                                      onChange={handleChange}
                                      error={(touched.amount && errors.amount) || undefined}
                                      value={values.amount}
                                      name="amount"
                                      className="my-5"
                                  />
                              {/* <CustomSelect
                                label="Select Investment duration"
                                options={options.map((opt) => ({
                                label: opt.name,
                                value: opt.id,
                                }))}
                                value={}
                                onChange={}
                                placeholder="Select an option"
                        /> */}

                                <CustomInput
                                      label="Select Investment duration"
                                      placeholder="Enter your duration"
                                      onChange={handleChange}
                                      error={(touched.investDuration && errors.investDuration) || undefined}
                                      value={values.investDuration}
                                      name="investDuration"
                                      className="my-5"
                                  />
                                 
                        
                                    <CustomInput
                                      label="Referral Code"
                                      placeholder="Enter your code"
                                      onChange={handleChange}
                                      error={(touched.referral && errors.referral) || undefined}
                                      value={values.referral}
                                      name="referral"
                                      className="my-5"
                                  />
                                  <div className="flex gap-1 items-start bg-pink-100 p-1 w-[80%] rounded-[8px]">
                                    <RedIcon/>
                                 <span className="text-[12px] text-[#FF466A]">A 10% withholding tax applies to your investment interest</span>            
                                    
                                  </div>
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
             Agree to{" "}
                <a
                  href="/terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C58940] underline"
                >
                   terms and conditions
                </a>
              </label>
            </div>
                                  <Button
                                    type="submit"
                                    className="my-9 w-[80%] h-[20%] mx-auto"
                                    // loading={AccountUpdate.isPending}
                                    disabled={!values.terms}
                                    onClick={() => router.push("/Dashboard/Preview")}
                                >
                                    Proceed
                                </Button>
                              </form>
                              
                          )}
                       </Formik>

            </>
    )
    


}
