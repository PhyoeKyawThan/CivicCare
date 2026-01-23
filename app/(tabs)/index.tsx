import { Header } from "@/components/header";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IssuesScreen from "../screens/issue_screen";
import OnSolvingIssueScreen from "../screens/onsolvingissues_screen";
import SolvedScreen from "../screens/solved_screen";

const TopTap = createMaterialTopTabNavigator();

function Home() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      {Header(isDark)}
      <TopTap.Navigator screenOptions={{
        tabBarScrollEnabled: false,
        sceneStyle: {
          backgroundColor: '#90D5ff'
        }
      }}>
        <TopTap.Screen name="Issues" options={{
          title: "Issues"
        }} component={IssuesScreen} />
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
    backgroundColor: '#90D5ff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default Home;