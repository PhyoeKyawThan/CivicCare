// useVote.ts
import { useCallback, useState } from "react";
import { IssueVote } from "./issues";

interface UseVoteProps {
  issue_id: string;
  initialVotes?: IssueVote;
}

export const useVote = ({ issue_id, initialVotes }: UseVoteProps) => {
  const [vote, setVote] = useState<IssueVote>(
    initialVotes || { up: 0, down: 0, score: 0, my_vote: 0 }
  );
  const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     const fetchVotes = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/v1/issues/${issue_id}/vote/`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setVote(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch votes:", error);
//       }
//     };

//     fetchVotes();
//   }, [issue_id]);

  const sendVote = useCallback(
    async (value: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://192.168.100.53:8000/api/v1/issues/${issue_id}/vote/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODgxNzc2LCJpYXQiOjE3Njk4NzgxNzYsImp0aSI6ImFjNjAzMjE5MDMzYjQ0ZjlhZTU2MjVhZGFkNjY2NTNhIiwidXNlcl9pZCI6IjI4NGRiNGFhLTM1MzMtNGI3MC1hMWNlLWEwMWU0OWYwMTk1YiJ9.wtHw79QlaIFV1OSoXjcmnKqZHMKnef7Uj765G58nTLY"
            },
            body: JSON.stringify({ 'value' : value }),
          }
        );
        if (response.ok) {
          const newVoteSummary = await response.json();
          setVote(newVoteSummary);
        } else {
          console.error("Failed to submit vote");
        }
      } catch (error) {
        console.error("Error submitting vote:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [issue_id]
  );

  return { vote, sendVote, isLoading };
};