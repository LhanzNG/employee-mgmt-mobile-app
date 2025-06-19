import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CircleUser as UserCircle, Mail, Phone, MapPin } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'onboarding' | 'inactive' | 'terminated';
  photo?: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onPress?: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onPress }) => {
  // Get status color
  const getStatusColor = () => {
    switch (employee.status) {
      case 'active':
        return colors.success[500];
      case 'onboarding':
        return colors.warning[500];
      case 'inactive':
        return colors.gray[500];
      case 'terminated':
        return colors.error[500];
      default:
        return colors.gray[500];
    }
  };
  
  // Format status text
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.photoContainer}>
          {employee.photo ? (
            <Image source={{ uri: employee.photo }} style={styles.photo} />
          ) : (
            <UserCircle size={60} color={colors.gray[400]} />
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{employee.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Text style={styles.statusText}>{formatStatus(employee.status)}</Text>
            </View>
          </View>
          
          <Text style={styles.position}>{employee.position}</Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.departmentBadge}>
              <Text style={styles.departmentText}>{employee.department}</Text>
            </View>
          </View>
          
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Mail size={14} color={colors.gray[500]} style={styles.contactIcon} />
              <Text style={styles.contactText} numberOfLines={1}>
                {employee.email}
              </Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={14} color={colors.gray[500]} style={styles.contactIcon} />
              <Text style={styles.contactText}>{employee.phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  photoContainer: {
    marginRight: 16,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: colors.white,
  },
  position: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  departmentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
  },
  departmentText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.primary[700],
  },
  contactRow: {
    flexDirection: 'column',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactIcon: {
    marginRight: 4,
  },
  contactText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    flex: 1,
  },
});

export default EmployeeCard;