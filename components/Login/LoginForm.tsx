"use client"
import * as yup from "yup"
import { Formik } from "formik";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import CustomPasswordInput from "../CustomPasswordInput/CustomPasswordInput";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../Button/Button";
import Login from "@/app/apis/mutations/use-login";
import { LoginPayload } from "@/constants";
import { useState, useEffect } from "react";

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
		.required("Password is required"),
		// .matches(
		// 	PASSWORD_REGEX,
		// 	"Password must contain at least 8 characters, an uppercase, a lowercase, a special character, and a number"
    // ),
    rememberMe: yup.boolean(),
});


function LoginForm() {
    const loginMutation = Login();

    const initialFormValues: LoginPayload & { rememberMe: boolean } = {
    email: "",
    password: "",
    rememberMe: false,
  };
    return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={(values) => {
        // Call login API
        loginMutation.mutate(values);

        if (values.rememberMe) {
          // Save both email + password in localStorage
          localStorage.setItem(
            "savedCredentials",
            JSON.stringify({ email: values.email, password: values.password })
          );
        } else {
          // Store in session (clears on tab close)
          sessionStorage.setItem(
            "savedCredentials",
            JSON.stringify({ email: values.email, password: values.password })
          );
          localStorage.removeItem("savedCredentials"); // clean up
        }
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
        // Prefill saved credentials on mount
        useEffect(() => {
          const saved =
            localStorage.getItem("savedCredentials") ||
            sessionStorage.getItem("savedCredentials");

          if (saved) {
            const { email, password } = JSON.parse(saved);
            setFieldValue("email", email);
            setFieldValue("password", password);
            if (localStorage.getItem("savedCredentials")) {
              setFieldValue("rememberMe", true);
            }
          }
        }, [setFieldValue]);

        return (
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
              error={(touched.password && errors.password) || undefined}
              value={values.password}
            />

            <div className="flex justify-between items-center my-5">
  <label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    name="rememberMe"
    className="peer hidden"
    onChange={handleChange}
    checked={values.rememberMe}
  />
  <span
    className="
      w-5 h-5 flex items-center justify-center rounded border-1
      border-[#C58940] bg-white
      peer-checked:bg-white
    "
  >
    {values.rememberMe && <span className="text-[#C58940]">✓</span>}
  </span>
  <span className="text-[#111827]">Remember me</span>
</label>


              <Button href="forgot-password" intent="link">
                Forgot Password
              </Button>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full"
              loading={loginMutation.isPending || loginMutation.isSuccess}
            >
              Login
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
export default LoginForm