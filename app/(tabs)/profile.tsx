import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleUser as UserCircle, Settings, LogOut, ChevronRight, Bell, Moon, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { useAuthStore } from '@/store/authStore';
import HeaderBar from '@/components/ui/HeaderBar';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            logout();
            router.replace('/auth/login');
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar 
        title="Profile" 
        rightIcon={<Settings color={colors.gray[700]} size={24} />}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} style={styles.profileImage} />
            ) : (
              <UserCircle size={80} color={colors.primary[500]} />
            )}
          </View>
          <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.profilePosition}>{user?.position || 'Position'}</Text>
          <View style={styles.profileBadge}>
            <Text style={styles.profileBadgeText}>Administrator</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: colors.primary[50] }]}>
                  <UserCircle size={20} color={colors.primary[500]} />
                </View>
                <Text style={styles.settingsItemText}>Edit Profile</Text>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.settingsDivider} />
            
            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: colors.info[50] }]}>
                  <Bell size={20} color={colors.info[500]} />
                </View>
                <Text style={styles.settingsItemText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray[300]}
              />
            </View>
            
            <View style={styles.settingsDivider} />
            
            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: colors.gray[100] }]}>
                  <Moon size={20} color={colors.gray[700]} />
                </View>
                <Text style={styles.settingsItemText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray[300]}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: colors.warning[50] }]}>
                  <HelpCircle size={20} color={colors.warning[500]} />
                </View>
                <Text style={styles.settingsItemText}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </TouchableOpacity>
            
            <View style={styles.settingsDivider} />
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: colors.success[50] }]}>
                  <Shield size={20} color={colors.success[500]} />
                </View>
                <Text style={styles.settingsItemText}>Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.error[500]} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>HRFlow v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.gray[800],
    marginBottom: 4,
  },
  profilePosition: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 12,
  },
  profileBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.primary[50],
    borderRadius: 16,
  },
  profileBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.primary[700],
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[700],
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsItemText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  settingsDivider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.error[500],
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  versionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[500],
  },
});