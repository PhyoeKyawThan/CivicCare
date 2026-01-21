import { StyleSheet, Text, View } from "react-native";
export function Header(isDark: boolean) {
    return (
        <View style={[styles.header, isDark && styles.darkHeader]}>
            <Text style={styles.appName}>
                <Text style={styles.appNameBold}>Civic</Text>
                <Text style={[styles.appNameLight, isDark && styles.darkAppNameLight]}>Care</Text>
            </Text>
            <Text style={[styles.headerSubtitle, isDark && styles.darkText]}>
                Community Dashboard
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    darkHeader: {
        backgroundColor: '#1E293B',
        borderBottomColor: '#334155',
    }, appName: {
        fontSize: 28,
        marginBottom: 4,
    },
    appNameBold: {
        fontWeight: '700',
        color: '#3B82F6',
        letterSpacing: -0.5,
    },
    appNameLight: {
        fontWeight: '300',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    darkAppNameLight: {
        color: '#E2E8F0',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    darkText: {
        color: '#94A3B8',
    },
})