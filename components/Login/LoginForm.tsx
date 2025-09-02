"use client"
import * as yup from "yup"
import { Formik } from "formik";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import CustomPasswordInput from "../CustomPasswordInput/CustomPasswordInput";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../Button/Button";

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
});


function LoginForm() {
    const initialFormValues = {
		email: "",
		password: "",
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
                        error={(touched.email && errors.password) || undefined}
                    />
                    <div className="flex justify-between items-center my-5">
                        <p>Remember Me</p>
                        <Button href="sign" intent="link">Forgot Password</Button>
                    </div>

                    <Button
						type="submit"
						className="mt-4 w-full h-10"
					>
						Login
					</Button>
                </form>
            )}


        </Formik>
    )
}
export default LoginForm