export const useServicesEndPoints = ()=>{
    const apiEntry = "http://192.168.100.49:8000/api/v1";
    return {
        'getIssueType': `${apiEntry}/issues/get/types`
    }
}
