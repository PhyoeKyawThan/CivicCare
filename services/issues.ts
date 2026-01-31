import { useServicesEndPoints } from "@/constants/services_endpoints";
import { useEffect, useState } from "react";

export type IssueStatus = 'open' | 'in_progress' | 'closed';
type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
type IssueAttachment = {
    id: number;
    file: string;
    file_type: string;
    created_at: string;
};
type IssueTypeDetail = {
    id: number;
    name: string;
    sample_form: string;
    created_at: string;
};


export type IssueVote = {
    up: number,
    down: number,
    score: number,
    my_vote: number
}

export type IssueUser = {
    id: string,
    username: string,
    avatar?: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    date_joined: string
}

export type Issue = {
    id: string;
    user: IssueUser;

    issue_type: number;
    issue_type_detail: IssueTypeDetail;

    title: string;
    description: string;

    status: IssueStatus;
    priority: IssuePriority;

    location_latitude: number | null;
    location_longitude: number | null;

    created_at: string;
    updated_at: string;
    closed_at: string | null;

    attachments: IssueAttachment[];
    vote_summary: IssueVote
};

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};


export function useIssue(page: number = 1) {
    const [data, setData] = useState<PaginatedResponse<Issue> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { getIssuesEntry } = useServicesEndPoints();
    useEffect(() => {
        let isMounted = true;

        const fetchIssues = async () => {
            setLoading(true);
            setError(null);

            try {
                // const access = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODc2NzE1LCJpYXQiOjE3Njk4NzMxMTUsImp0aSI6IjZiY2FkMjdhODc4YjQyYmFiN2ZlYjY2NDUyNDdkMzEzIiwidXNlcl9pZCI6IjI4NGRiNGFhLTM1MzMtNGI3MC1hMWNlLWEwMWU0OWYwMTk1YiJ9.l0ogxEPczaTUPrhswrgWBrlMV4zy7YKZdBJNxNxMUYc";
                const res = await fetch(`${getIssuesEntry}?page=${page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODgwMjM1LCJpYXQiOjE3Njk4NzY2MzUsImp0aSI6ImQyMDNkNTQyZjlmNDQxOGRhMzI5MGYyZWZhYzUyZTdjIiwidXNlcl9pZCI6ImNjNmU1YWRkLTJiYzMtNGY3Ni1hMmNlLWE0ZGYzZjg3NTFiOSJ9.oeu4Nk7jh7oH9SmRzgFddYKGP5JJ2YZZg1KRBfVqyGo`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch issues");

                const json: PaginatedResponse<Issue> = await res.json();

                if (isMounted) {
                    setData(json);
                }
            } catch (err) {
                if (isMounted) {
                    setError((err as Error).message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchIssues();

        return () => {
            isMounted = false;
        };
    }, [page, getIssuesEntry]);

    return {
        issues: data?.results ?? [],
        count: data?.count ?? 0,
        next: data?.next,
        previous: data?.previous,
        hasNext: Boolean(data?.next),
        hasPrevious: Boolean(data?.previous),
        loading,
        error,
    };

}
