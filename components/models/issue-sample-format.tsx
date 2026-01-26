import { Colors } from "@/constants/theme";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface IssueSampleProps {
    issue_sample: {
        issueType: string;
        sampleFormatText: string;
        visible: boolean;
    };
    onClose: () => void;
}

export default function IssueSampleFormat({
    issue_sample,
    onClose,
}: IssueSampleProps) {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const copyText = async () => {
        await Clipboard.setStringAsync(issue_sample.sampleFormatText);
        setIsCopied(true);
    };
    const insets = useSafeAreaInsets();
    return (
            <Modal
                visible={issue_sample.visible}
                animationType="slide"
                transparent={false}
                onRequestClose={onClose}
            >
                <View style={[styles.container, {
                    marginTop: insets.top
                }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{issue_sample.issueType}</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>Close</Text>
                        </Pressable>
                    </View>

                    {/* Selectable Content */}
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={copyText}
                            style={{
                                width: 'auto',
                                borderRadius: 18,
                                backgroundColor: Colors.light.background,
                                padding: 8,
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>{isCopied ? 'Copied Text': 'Copy Text'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.sampleText}>
                            {issue_sample.sampleFormatText}
                        </Text>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        justifyContent: 'center'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
    },
    close: {
        color: "#2563eb",
        fontSize: 16,
    },
    content: {
        // flex: 1, 
    },
    sampleText: {
        fontSize: 16,
        padding: 10,
        lineHeight: 22,
        textAlign: 'justify'
    },
});
