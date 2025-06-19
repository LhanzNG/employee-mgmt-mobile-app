import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, DollarSign, FileText, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Request {
  id: string;
  type: 'leave' | 'remote' | 'expense' | 'overtime';
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  days?: number;
  hours?: number;
  amount?: number;
  currency?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approver: string;
  rejectionReason?: string;
}

interface RequestCardProps {
  request: Request;
  onPress: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  const getTypeIcon = () => {
    switch (request.type) {
      case 'leave':
        return <Calendar size={20} color={colors.primary[500]} />;
      case 'remote':
        return <Clock size={20} color={colors.info[500]} />;
      case 'expense':
        return <DollarSign size={20} color={colors.success[500]} />;
      case 'overtime':
        return <Clock size={20} color={colors.warning[500]} />;
      default:
        return <FileText size={20} color={colors.gray[500]} />;
    }
  };
  
  const getStatusDisplay = () => {
    switch (request.status) {
      case 'approved':
        return {
          icon: <CheckCircle size={16} color={colors.success[500]} />,
          color: colors.success[50],
          textColor: colors.success[700],
          label: 'Approved'
        };
      case 'rejected':
        return {
          icon: <XCircle size={16} color={colors.error[500]} />,
          color: colors.error[50],
          textColor: colors.error[700],
          label: 'Rejected'
        };
      case 'pending':
        return {
          icon: <AlertCircle size={16} color={colors.warning[500]} />,
          color: colors.warning[50],
          textColor: colors.warning[700],
          label: 'Pending'
        };
      default:
        return {
          icon: <AlertCircle size={16} color={colors.gray[500]} />,
          color: colors.gray[50],
          textColor: colors.gray[700],
          label: 'Unknown'
        };
    }
  };
  
  const getRequestDetails = () => {
    switch (request.type) {
      case 'leave':
        return `${request.days} day${request.days !== 1 ? 's' : ''} • ${formatDate(request.startDate!)} - ${formatDate(request.endDate!)}`;
      case 'remote':
        return `${request.days} day${request.days !== 1 ? 's' : ''} • ${formatDate(request.startDate!)}`;
      case 'expense':
        return `${formatCurrency(request.amount!, request.currency)}`;
      case 'overtime':
        return `${request.hours} hour${request.hours !== 1 ? 's' : ''}`;
      default:
        return '';
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            {getTypeIcon()}
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.description}>{request.description}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusDisplay.color }]}>
          {statusDisplay.icon}
          <Text style={[styles.statusText, { color: statusDisplay.textColor }]}>
            {statusDisplay.label}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailsText}>{getRequestDetails()}</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.submittedText}>
          Submitted {formatDate(request.submittedDate)} • {request.approver}
        </Text>
      </View>
      
      {request.status === 'rejected' && request.rejectionReason && (
        <View style={styles.rejectionContainer}>
          <Text style={styles.rejectionLabel}>Rejection Reason:</Text>
          <Text style={styles.rejectionReason}>{request.rejectionReason}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
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
  details: {
    marginBottom: 12,
  },
  detailsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary[500],
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  submittedText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  rejectionContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.error[50],
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.error[500],
  },
  rejectionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.error[700],
    marginBottom: 4,
  },
  rejectionReason: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.error[600],
  },
});

export default RequestCard;