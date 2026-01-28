import { useServicesEndPoints } from "@/constants/services_endpoints"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

type IssueType = {
    id: number,
    name: string,
    sample_form?: string
}

export function useIssueType() {
    const { getIssueType } = useServicesEndPoints();
    const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
    useEffect(() => {
        getIssues();
    }, [])

    const getIssues = async () => {
        await fetch(getIssueType, {
            method: 'GET'
        })
        .then(value => value.json())
        .then((data) => setIssueTypes(data.results))
        .catch((error) => Alert.alert(error));
    }

    return {
        issueTypes,
        getIssues
    }
}