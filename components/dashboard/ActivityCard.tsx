import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Calendar, Briefcase, TrendingUp } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Activity {
  id: number;
  type: 'hire' | 'interview' | 'application' | 'promotion';
  name: string;
  position: string;
  date: string;
}

interface ActivityCardProps {
  activity: Activity;
  onPress?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onPress }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get icon and color based on activity type
  const getIconAndColor = () => {
    switch (activity.type) {
      case 'hire':
        return {
          icon: <User size={20} color={colors.success[500]} />,
          color: colors.success[50],
          label: 'New Hire'
        };
      case 'interview':
        return {
          icon: <Calendar size={20} color={colors.info[500]} />,
          color: colors.info[50],
          label: 'Interview'
        };
      case 'application':
        return {
          icon: <Briefcase size={20} color={colors.primary[500]} />,
          color: colors.primary[50],
          label: 'Application'
        };
      case 'promotion':
        return {
          icon: <TrendingUp size={20} color={colors.warning[500]} />,
          color: colors.warning[50],
          label: 'Promotion'
        };
      default:
        return {
          icon: <User size={20} color={colors.gray[500]} />,
          color: colors.gray[50],
          label: 'Activity'
        };
    }
  };
  
  const { icon, color, label } = getIconAndColor();
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{activity.name}</Text>
          <Text style={styles.date}>{formatDate(activity.date)}</Text>
        </View>
        
        <Text style={styles.position}>{activity.position}</Text>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  position: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.gray[100],
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.gray[700],
  },
});

export default ActivityCard;