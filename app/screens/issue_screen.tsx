// IssuesScreen.js
import { issues } from "@/assets/samples/sample_dummy";
import IssuePost from "@/components/issue-post";
import {
    ScrollView,
    StyleSheet,
    View
} from "react-native";

export default function IssuesScreen() {
    return (
        <ScrollView>
            <View style={styles.feed_container}>
                {issues.map((issue) => {
                    return <IssuePost key={issue.id} issue={issue} />
                })}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    feed_container: {
        flex: 1,
        paddingBottom: 70,
        // backgroundColor: '#90D5ff'
    }
});