import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Calendar, FileCheck, Bell, TrendingUp, DollarSign, FileText } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Notification {
  id: string;
  type: 'application' | 'interview' | 'review' | 'offer' | 'onboarding' | 'leave' | 'payroll';
  message: string;
  date: string;
  read: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };
  
  // Get icon and color based on notification type
  const getIconAndColor = () => {
    switch (notification.type) {
      case 'application':
        return {
          icon: <FileText size={20} color={colors.primary[500]} />,
          color: colors.primary[50],
        };
      case 'interview':
        return {
          icon: <Calendar size={20} color={colors.info[500]} />,
          color: colors.info[50],
        };
      case 'review':
        return {
          icon: <FileCheck size={20} color={colors.warning[500]} />,
          color: colors.warning[50],
        };
      case 'offer':
        return {
          icon: <FileCheck size={20} color={colors.success[500]} />,
          color: colors.success[50],
        };
      case 'onboarding':
        return {
          icon: <User size={20} color={colors.primary[500]} />,
          color: colors.primary[50],
        };
      case 'leave':
        return {
          icon: <Calendar size={20} color={colors.secondary[500]} />,
          color: colors.secondary[50],
        };
      case 'payroll':
        return {
          icon: <DollarSign size={20} color={colors.success[500]} />,
          color: colors.success[50],
        };
      default:
        return {
          icon: <Bell size={20} color={colors.gray[500]} />,
          color: colors.gray[50],
        };
    }
  };
  
  const { icon, color } = getIconAndColor();
  
  return (
    <TouchableOpacity
      style={[
        styles.card,
        notification.read ? styles.cardRead : styles.cardUnread
      ]}
      onPress={onMarkAsRead}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[
            styles.message,
            notification.read ? styles.messageRead : styles.messageUnread
          ]}
        >
          {notification.message}
        </Text>
        <Text style={styles.date}>{formatDate(notification.date)}</Text>
      </View>
      
      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardUnread: {
    backgroundColor: colors.white,
  },
  cardRead: {
    backgroundColor: colors.gray[50],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  message: {
    marginBottom: 4,
  },
  messageUnread: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[800],
  },
  messageRead: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[700],
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[500],
    marginLeft: 8,
  },
});

export default NotificationCard;