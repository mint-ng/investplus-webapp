"use client"
import * as yup from "yup"
import { Formik } from "formik";
import React, {useState} from 'react'
import Arrow from "@/public/left.svg"
import { useRouter } from 'next/navigation'
import CustomInput from "@/components/CustomInput/CustomInput";
import Button from "@/components/Button/Button";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import useTenors from "@/app/apis/mutations/queries/get-tenors";
import RedIcon from "@/public/red.svg"
import { toast } from "react-toastify";
import { useCreateInvestment } from "@/app/apis/mutations/get-create-investment";

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
      .trim(),
    terms: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
});
export default function Create() {
  const router = useRouter();
  const [minMax, setMinMax] = useState<{ min: number; max: number; interestRate: number } | null>(null);
  const createInvestment = useCreateInvestment();
   const { data: tenors,  } = useTenors() as { data?: Tenor[] };


      const initialFormValues = {
		duration: "",
		amount: "",
		investDuration: "",
		referral: "",
        terms: false,
    };

    const handleSubmit = async (values: typeof initialFormValues) => {
    const payload = {
      durationInMonths: Number(values.investDuration),
        durationId: Number(values.duration),
        investmentAmount: Number(values.amount),
        referralCode: values.referral,
    };

    createInvestment.mutate(payload, {
      onSuccess: (response) => {
        toast.success("Investment created successfully!");
         const serialized = encodeURIComponent(JSON.stringify(response));

    router.push(`/Dashboard/Preview?data=${serialized}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    });
  };
    
    // Tenor category options
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
        key: `tenor-${t.durationId}`,
        min,
        max,
        interestRate: t.interestRate,
      };
    }) || [];


  // Build invest duration options from selected minMax
  const investDurationOptions = minMax
    ? Array.from({ length: minMax.max - minMax.min + 1 }, (_, i) => {
        const month = minMax.min + i;
        return {
          label: `${month} month${month > 1 ? "s" : ""}`,
          value: String(month),
          key: `duration-${month}`,
        };
      })
    : [];

  

    return (
      <>
      <div className='flex gap-1 mt-6 cursor-pointer' onClick={() => router.push("/Dashboard")}>
          <Arrow />
          <p>Dashboard</p>
            </div>
        
             <Formik
                initialValues={initialFormValues}
                validationSchema={formValidationSchema}
                 onSubmit={handleSubmit}

                      >
                          {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => ( 
                              <form
                                  className="max-w-[550px] mt-[20px] bg-white p-8 rounded-lg shadow-lg"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                              }}
                                    
                          >
                        <h2 className="mb-[19px] text-[16px] font-semibold border-b-1 border-[#DFDFDF] pb-3">Create Investment</h2>
                                      <CustomSelect
                                          label="Duration Category"
                                          options={tenorOptions}
                                          value={values.duration}
                                          error={(touched.duration && errors.duration) || undefined}
                                          onChange={(val) => {
                                          setFieldValue("duration", val);                        
                                          const selectedTenor = tenorOptions.find((t) => t.value === val);
                                          if (selectedTenor) {
                                            setMinMax({
                                              min: selectedTenor.min,
                                              max: selectedTenor.max,
                                              interestRate: selectedTenor.interestRate,
                                            });
                                          } else {
                                            setMinMax(null);
                                          }
                                        }}
                      placeholder="Select a duration"
                      />
                  <CustomInput
                  label="How much would you like to invest?"
                  placeholder="Enter the amount"
                  name="amount"
                  className="my-5"
                  error={(touched.amount && errors.amount) || undefined}
                  value={values.amount ? `₦${values.amount}` : ""}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/₦|,/g, "");
                    if (!isNaN(Number(rawValue))) {
                      setFieldValue("amount", rawValue);
                    }
                }}
              />

          <CustomSelect
            label="Select Investment Duration"
            options={investDurationOptions}
            value={values.investDuration}
            onChange={(val) => setFieldValue("investDuration", val)}
            placeholder="Select investment duration"
            error={(touched.investDuration && errors.investDuration) || undefined}
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
                                  <div className="flex gap-1 items-start bg-pink-100 p-1 w-[70%] rounded-[8px]">
                                    <RedIcon/>
                                 <span className="text-[9px] text-[#FF466A]">A 10% withholding tax applies to your investment interest</span>            
                                    
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
                                    loading={createInvestment.isPending}
                                    disabled={!values.terms}
                                >
                                    Proceed
                                </Button>
                              </form>
                              
                          )}
                       </Formik>

            </>
    )
    


}
