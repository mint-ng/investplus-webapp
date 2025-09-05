"use client"
import * as yup from "yup"
import { Formik } from "formik";
import { EMAIL_REGEX,} from "@/constants";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../Button/Button";
import CustomTextArea from "../CustomTextArea/CustomTextArea";

const formValidationSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Please use a valid email address")
        .matches(EMAIL_REGEX, "Please use a valid email address"),
    firstName: yup
        .string()
        .trim()
        .required("First name is required"),
    lastName: yup
        .string()
        .trim()
        .required("Last name is required"),
    phoneNumber: yup
        .string()
        .trim()
        .required("Phone number is required")
        .email("Please use a valid email address"),
        // .matches(EMAIL_REGEX, "Please use a valid email address"),
    enquiry: yup
        .string()
        .trim()
        // .matches(EMAIL_REGEX, "Please use a valid email address"),
    
});

function SuppportForm() {
        const initialFormValues = {
		email: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		enquiry: "",
        
    };

    return (
            <Formik
                initialValues={initialFormValues}
                validationSchema={formValidationSchema}
                onSubmit={(values)=>console.log(values)}
            >
                {({ values, errors, touched, handleSubmit, handleChange }) => ( 
                    <form
                        className="w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                >
                    <CustomInput
                            label="First Name"
                            placeholder="Enter your first name"
                            type="text"
                            onChange={handleChange}
                            error={(touched.firstName && errors.firstName) || undefined}
                            value={values.firstName}
                            name="firstName"
                            className="mb-6"
                    />
                    <CustomInput
                            label="Last Name"
                            placeholder="Enter your last name"
                            type="text"
                            onChange={handleChange}
                            error={(touched.lastName && errors.lastName) || undefined}
                            value={values.lastName}
                            name="lastName"
                            className="mb-6"
                    />
                    
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
                    
                     <CustomInput
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            phone={true}
                            onChange={handleChange}
                            error={(touched.phoneNumber && errors.phoneNumber) || undefined}
                            value={values.phoneNumber}
                            name="phoneNumber"
                            className="mb-6"
                    />

                    <CustomTextArea
                        label="Your Enquiry"
                        placeholder="Type your message here"
                        onChange={handleChange}
                        error={(touched.enquiry && errors.enquiry) || undefined}
                        value={values.enquiry}
                        name="enquiry"
                    />
    
                        <Button
                            type="submit"
                            className="my-12 w-full h-10"
                        >
                            Get in touch
                        </Button>
                    </form>
                )}
    
    
            </Formik>
        )
}
    
export default SuppportForm