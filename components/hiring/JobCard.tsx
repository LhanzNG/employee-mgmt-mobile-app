import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Briefcase, MapPin, Calendar, Users } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'active' | 'filled' | 'draft' | 'closed';
  postedDate: string;
  applicantsCount: number;
}

interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get job type badge color
  const getJobTypeColor = () => {
    switch (job.type) {
      case 'full-time':
        return colors.primary[50];
      case 'part-time':
        return colors.info[50];
      case 'contract':
        return colors.warning[50];
      case 'internship':
        return colors.success[50];
      default:
        return colors.gray[50];
    }
  };
  
  // Get job type badge text color
  const getJobTypeTextColor = () => {
    switch (job.type) {
      case 'full-time':
        return colors.primary[700];
      case 'part-time':
        return colors.info[700];
      case 'contract':
        return colors.warning[700];
      case 'internship':
        return colors.success[700];
      default:
        return colors.gray[700];
    }
  };
  
  // Format job type text
  const formatJobType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Get status color
  const getStatusColor = () => {
    switch (job.status) {
      case 'active':
        return colors.success[500];
      case 'filled':
        return colors.info[500];
      case 'draft':
        return colors.gray[500];
      case 'closed':
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{job.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{formatStatus(job.status)}</Text>
          </View>
        </View>
        
        <View style={styles.departmentRow}>
          <Briefcase size={16} color={colors.gray[600]} style={styles.icon} />
          <Text style={styles.department}>{job.department}</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.gray[600]} style={styles.icon} />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Calendar size={16} color={colors.gray[600]} style={styles.icon} />
          <Text style={styles.detailText}>Posted {formatDate(job.postedDate)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Users size={16} color={colors.gray[600]} style={styles.icon} />
          <Text style={styles.detailText}>{job.applicantsCount} applicants</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View 
          style={[
            styles.jobTypeBadge, 
            { backgroundColor: getJobTypeColor() }
          ]}
        >
          <Text 
            style={[
              styles.jobTypeText, 
              { color: getJobTypeTextColor() }
            ]}
          >
            {formatJobType(job.type)}
          </Text>
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
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    flex: 1,
    marginRight: 8,
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
  departmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  department: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  detailText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  footer: {
    flexDirection: 'row',
  },
  jobTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  jobTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default JobCard;