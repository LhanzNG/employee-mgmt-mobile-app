import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: 'present' | 'late' | 'absent' | 'half-day';
}

interface AttendanceCardProps {
  record: AttendanceRecord;
  onPress?: () => void;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ record, onPress }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Get status icon and color
  const getStatusDisplay = () => {
    switch (record.status) {
      case 'present':
        return {
          icon: <CheckCircle size={20} color={colors.success[500]} />,
          color: colors.success[50],
          textColor: colors.success[700],
          label: 'Present'
        };
      case 'late':
        return {
          icon: <AlertCircle size={20} color={colors.warning[500]} />,
          color: colors.warning[50],
          textColor: colors.warning[700],
          label: 'Late'
        };
      case 'absent':
        return {
          icon: <XCircle size={20} color={colors.error[500]} />,
          color: colors.error[50],
          textColor: colors.error[700],
          label: 'Absent'
        };
      case 'half-day':
        return {
          icon: <Clock size={20} color={colors.info[500]} />,
          color: colors.info[50],
          textColor: colors.info[700],
          label: 'Half Day'
        };
      default:
        return {
          icon: <Clock size={20} color={colors.gray[500]} />,
          color: colors.gray[50],
          textColor: colors.gray[700],
          label: 'Unknown'
        };
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formatDate(record.date)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusDisplay.color }]}>
          {statusDisplay.icon}
          <Text style={[styles.statusText, { color: statusDisplay.textColor }]}>
            {statusDisplay.label}
          </Text>
        </View>
      </View>
      
      <View style={styles.timeContainer}>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Check In</Text>
          <Text style={styles.timeValue}>{record.checkIn}</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Check Out</Text>
          <Text style={styles.timeValue}>{record.checkOut}</Text>
        </View>
        <View style={styles.timeItem}>
          <Text style={styles.timeLabel}>Hours</Text>
          <Text style={styles.timeValue}>{record.hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    alignItems: 'center',
  },
  timeLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  timeValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[800],
  },
});

export default AttendanceCard;