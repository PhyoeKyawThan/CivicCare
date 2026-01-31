import { IssueStatus, IssueVote } from "@/services/issues";


type myVote = 0 | -1 | 1;

export type IssueUI = {
  id: string;

  username: string;
  profile_image: string | null;

  title: string;
  reported_text: string;
  reported_date: string;

  reported_images: string[];


  status: IssueStatus;
  votes: IssueVote;
  is_viewed: boolean;
};
