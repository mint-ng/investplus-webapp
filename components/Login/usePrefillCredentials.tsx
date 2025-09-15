import { useEffect } from "react";
import { useFormikContext } from "formik";

export function usePrefillCredentials() {
  const { setFieldValue } = useFormikContext<any>();

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
}
