import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 12,
          borderRadius: 50,
          elevation: 8,
          shadowColor: isDark ? '#000' : '#64748B',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <IconSymbol 
                size={focused ? 26 : 24} 
                name="house.fill" 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <IconSymbol 
                size={focused ? 26 : 24} 
                name="bell.fill" 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="issues_report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.centralIconContainer}>
              <View style={[
                styles.centralIconBackground,
                { backgroundColor: isDark ? '#0F172A' : '#FFFFFF' }
              ]}>
                <IconSymbol 
                  size={28} 
                  name="exclamationmark.triangle.fill" 
                  color={color} 
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <IconSymbol 
                size={focused ? 26 : 24} 
                name="person.fill" 
                color={color} 
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <IconSymbol 
                size={focused ? 26 : 24} 
                name="gearshape.fill" 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  centralIconContainer: {
    top: -20,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  centralIconBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
});