import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch, Alert, Pressable } from 'react-native';
import { Settings, Moon, Bell, User, HelpCircle, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useUserProfile } from '@/context/UserProfileContext';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const { profile, updateProfile, saveProfile } = useUserProfile();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, we would update the theme here
    Alert.alert('Coming Soon', 'Dark mode will be available in a future update.');
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // In a real app, we would update notification settings
    Alert.alert('Coming Soon', 'Notification settings will be available in a future update.');
  };

  const handleClearProfile = () => {
    Alert.alert(
      'Clear Profile',
      'Are you sure you want to clear your allergen profile? This will remove all your saved allergens.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            saveProfile({
              allergens: [],
              dietaryRestrictions: [],
              name: profile.name,
              emergencyContact: profile.emergencyContact,
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Moon size={20} color={Colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#ccc', true: Colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color={Colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Enable Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: '#ccc', true: Colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <User size={20} color={Colors.text} style={styles.settingIcon} />
            <View>
              <Text style={styles.settingText}>Emergency Contact</Text>
              <Text style={styles.settingDescription}>
                {profile.emergencyContact || 'Not set'}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={20} color={Colors.text} style={styles.settingIcon} />
            <Text style={styles.settingText}>Help & FAQ</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <Button
          title="Clear Allergen Profile"
          onPress={handleClearProfile}
          variant="danger"
          icon={<Trash2 size={16} color="#fff" />}
          style={styles.dangerButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: Colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  dangerButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: Colors.textLight,
  },
});