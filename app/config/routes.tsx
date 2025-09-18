export default {
    login: "/api/v1/extranet/invest-pulse/login",
    getOtp: "/api/v1/extranet/invest-pulse",
    validateOtp: (sessionId: string) => `/api/v1/extranet/invest-pulse/validateOtp/${sessionId}`,
    resendOtp: (sessionId: string) => `/api/v1/extranet/invest-pulse/resendOtp/${sessionId}`,
    completeRegistration: (sessionId: string) => `/api/v1/extranet/invest-pulse/update-password/${sessionId}`,
    updateAccount: (sessionId: string) => `/api/v1/extranet/invest-pulse/update-account/${sessionId}`,
    forgotPassword: "/api/v1/extranet/invest-pulse/send-reset-password-link",
    getInvestments: "/api/v1/extranet/invest-pulse/investments",
    getTenors: "/api/v2/common/investment-tenors",
    payment: "/api/v1/extranet/invest-pulse/payment-reference",
    resetPassword: "/api/v1/extranet/invest-pulse/reset-password",
    fundInvestment: "/api/v1/extranet/invest-pulse/payment-reference"
    // getTenors: "/common/investment-tenors",

}