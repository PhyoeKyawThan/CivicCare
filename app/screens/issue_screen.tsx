// IssuesScreen.js
import { issues } from "@/assets/samples/sample_dummy";
import IssuePost from "@/components/issue-post";
import { IssueType } from "@/constants/types";
import {
    ScrollView,
    Text,
    View,
    StyleSheet
} from "react-native";

export default function IssuesScreen() {
    const issue: IssueType = {
        "id": 1001,
        "title": "Broken Login System",
        "profile_image": "https://dummyimage.com/100x100/000/646ce3.png&text=User+Profile",
        "username": "john_doe",
        "reported_text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolorem eos ducimus inventore, perferendis vel expedita deserunt obcaecati voluptates, voluptas sit atque debitis modi eaque voluptate numquam voluptatem quisquam aspernaturLorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolorem eos ducimus inventore, perferendis vel expedita deserunt obcaecati voluptates, voluptas sit atque debitis modi eaque voluptate numquam voluptatem quisquam aspernatur?",
        "reported_images": ["https://dummyimage.com/700x700/000/646ce3.png&text=Image 1",
            "https://dummyimage.com/700x700/000/646ce3.png&text=Image 2", "https://dummyimage.com/700x700/000/646ce3.png&text=Image 3"],
        "command_count": 5,
        "reported_date": "01-21-2026",
        "is_viewed": false
    };
    return (
        <ScrollView style={{
            paddingBottom: 50
        }}>
            {issues.map((issue)=>{
                return <IssuePost key={issue.id} issue={issue}/>
            })}
            {/* <IssuePost issue={issue} /> */}
        </ScrollView>
    );
}
