import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, CircleCheck as CheckCircle } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import HeaderBar from '@/components/ui/HeaderBar';
import NotificationCard from '@/components/notifications/NotificationCard';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'application',
      message: 'New application received for Senior Developer position',
      date: '2023-05-10T10:30:00',
      read: false
    },
    {
      id: '2',
      type: 'interview',
      message: 'Interview scheduled with Sarah Johnson for UX Designer position',
      date: '2023-05-09T14:20:00',
      read: false
    },
    {
      id: '3',
      type: 'review',
      message: 'Performance review reminder for James Wilson',
      date: '2023-05-09T09:15:00',
      read: true
    },
    {
      id: '4',
      type: 'offer',
      message: 'Offer accepted by Michael Brown for Product Manager position',
      date: '2023-05-08T16:45:00',
      read: true
    },
    {
      id: '5',
      type: 'onboarding',
      message: 'Emily Davis completed all onboarding tasks',
      date: '2023-05-07T11:30:00',
      read: true
    },
    {
      id: '6',
      type: 'leave',
      message: 'Jason Miller requested vacation from June 10-17',
      date: '2023-05-06T13:10:00',
      read: true
    },
    {
      id: '7',
      type: 'payroll',
      message: 'May payroll has been processed successfully',
      date: '2023-05-05T09:00:00',
      read: true
    }
  ]);
  
  // Mark notification as read
  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Notifications" />
      
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.summaryContainer}>
            <Bell size={20} color={colors.gray[700]} />
            <Text style={styles.summaryText}>
              {unreadCount ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </Text>
          </View>
          
          {unreadCount > 0 && (
            <TouchableOpacity 
              style={styles.markAllButton}
              onPress={handleMarkAllAsRead}
            >
              <CheckCircle size={16} color={colors.primary[500]} style={styles.markAllIcon} />
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView 
          style={styles.notificationsList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationsContent}
        >
          {notifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
            />
          ))}
          
          <View style={styles.footer} />
        </ScrollView>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 8,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  markAllIcon: {
    marginRight: 4,
  },
  markAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary[500],
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingBottom: 16,
  },
  footer: {
    height: 24,
  },
});