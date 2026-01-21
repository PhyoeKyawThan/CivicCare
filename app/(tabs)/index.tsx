import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from "@/components/header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IssuesScreen from "../screens/issue_screen";
import SolvedScreen from "../screens/solved_screen";
import OnSolvingIssueScreen from "../screens/onsolvingissues_screen";

const TopTap = createMaterialTopTabNavigator();

function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      {Header(isDark)}
      <TopTap.Navigator screenOptions={{
        tabBarScrollEnabled: false,
      }} style={styles.tabContainer}>
        <TopTap.Screen name="Issues" component={IssuesScreen} />
        <TopTap.Screen name="Solved" component={SolvedScreen} />
        <TopTap.Screen name="Onsolving" component={OnSolvingIssueScreen} />
      </TopTap.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8FAFC',
  },
  darkContainer: {
    backgroundColor: '#0F172A',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  darkTabContainer: {
    backgroundColor: '#1E293B',
    borderBottomColor: '#334155',
    shadowColor: '#000',
  },
  tabScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    position: 'relative',
  },
  activeTabItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  darkActiveTabItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  darkTabText: {
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  darkActiveTabText: {
    color: '#60A5FA',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -8,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 1.5,
  },
  darkTabIndicator: {
    backgroundColor: '#60A5FA',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#64748B',
  },
  darkContentText: {
    color: '#94A3B8',
  },
});

export default Home;