import { IssueType } from "@/constants/types";
import { useState } from "react";
import { Modal, Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import ImageViewer from "./image-viewer";

interface IssuePostProps {
    issue: IssueType;
}
export default function IssuePost({ issue }: IssuePostProps) {
    const [showFullText, setShowFullText] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const toggleReadMore = () => {
        setShowFullText(!showFullText);
    }

    const toggleVisible = (image: string | null = null) => {
        setVisible(!visible);
        if (image) {
            setCurrentImage(image);
        }
    }
    return (
        <>
            <View style={styles.card}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 10
                }}>
                    <Image style={styles.profile_image} src={issue.profile_image} />
                    <Text style={styles.username}>{issue.username} ( <Text style={styles.status}>OnGoing</Text> )</Text>
                </View>
                <View style={styles.issue_content}>
                    <Text style={{ fontWeight: "300" }}>Date: {issue.reported_date}</Text>
                    <Text style={{ fontWeight: "500" }}>Title: {issue.title}</Text>

                    <TouchableOpacity onPress={toggleReadMore}>
                        <Text
                            style={{
                                textAlign: 'justify'
                            }}
                            numberOfLines={showFullText ? undefined : 3}>
                            {issue.reported_text}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-evenly' }}>
                    {issue.reported_images?.map((image, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => toggleVisible(image)}>
                                    <Image src={image} style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 20
                                    }} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={issue.is_viewed ? styles.viewed : styles.pending}>{issue.is_viewed ? 'Viewed By Administrator' : 'Pending'}</Text>
                    <Text>Comments 100</Text>
                </View>
            </View>
            <ImageViewer image={currentImage} visible={visible} onClose={toggleVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        // height: 400,
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        borderRadius: 20,
        // gap: 10
    },
    profile_image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    username: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    status: {
        fontWeight: '500',
        color: 'green'
    },
    issue_content: {
        padding: 10,
        gap: 10
    },
    viewed: {
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 50,
        backgroundColor: '#F5F5F5', // Soft Gray
        borderColor: '#BDBDBD',
        color: '#9E9E9E',
    },
    pending: {
        backgroundColor: '#f1de90',
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 50,
        fontWeight: '500',
        color: '#455A64',
    },
});