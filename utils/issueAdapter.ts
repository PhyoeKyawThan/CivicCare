
import { useServicesEndPoints } from "@/constants/services_endpoints";
import { Issue } from "@/services/issues";
import { IssueUI } from "@/types/IssueUI";

const { mediaEntry } = useServicesEndPoints()

export const mapIssueToUI = (issue: Issue): IssueUI => {
  return {
  id: issue.id,

  username: issue.user.avatar || "Anonymous",
  profile_image: null, 

  title: issue.title.replace(/^"+|"+$/g, ""),
  reported_text: issue.description.replace(/^"+|"+$/g, ""),
  reported_date: new Date(issue.created_at).toLocaleDateString(),

  reported_images: issue.attachments.map(a => a.file),

  status: issue.status,
  votes: issue.vote_summary,
  is_viewed: issue.status !== "open",
}
};
