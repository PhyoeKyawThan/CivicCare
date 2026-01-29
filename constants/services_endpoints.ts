export const useServicesEndPoints = ()=>{
    const apiEntry = "http://192.168.178.153:8000/api/v1";
    return {
        'getIssueType': `${apiEntry}/issues/get/types`
    }
}
