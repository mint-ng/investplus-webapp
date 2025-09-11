export default {
    login: "/api/v1/extranet/invest-pulse/login",
    getOtp: "/api/v1/extranet/invest-pulse",
    validateOtp:(sessionId:string) =>`/api/v1/extranet/invest-pulse/validateOtp/${sessionId}`,
    
}