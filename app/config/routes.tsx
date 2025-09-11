export default {
    login: "/api/v1/extranet/invest-pulse/login",
    getOtp: "/api/v1/extranet/invest-pulse",
    validateOtp: (sessionId: string) => `/api/v1/extranet/invest-pulse/validateOtp/${sessionId}`,
    resendOtp: (sessionId: string) => `/api/v1/extranet/invest-pulse/resendOtp/${sessionId}`,
    updateAccount: (sessionId: string) => `/api/v1/extranet/invest-pulse/update-account/${sessionId}`,
    forgotPassword: "/api/v1/extranet/invest-pulse/send-reset-password-link"
}