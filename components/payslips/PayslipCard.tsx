import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Download, Eye, CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react-native';
import { colors } from '@/styles/colors';

interface Payslip {
  id: string;
  month: string;
  grossSalary: number;
  netSalary: number;
  deductions: number;
  status: 'paid' | 'pending' | 'processing';
  payDate: string;
  currency: string;
}

interface PayslipCardProps {
  payslip: Payslip;
  onView: () => void;
  onDownload: () => void;
}

const PayslipCard: React.FC<PayslipCardProps> = ({ payslip, onView, onDownload }) => {
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStatusDisplay = () => {
    switch (payslip.status) {
      case 'paid':
        return {
          icon: <CheckCircle size={16} color={colors.success[500]} />,
          color: colors.success[50],
          textColor: colors.success[700],
          label: 'Paid'
        };
      case 'pending':
        return {
          icon: <Clock size={16} color={colors.warning[500]} />,
          color: colors.warning[50],
          textColor: colors.warning[700],
          label: 'Pending'
        };
      case 'processing':
        return {
          icon: <Clock size={16} color={colors.info[500]} />,
          color: colors.info[50],
          textColor: colors.info[700],
          label: 'Processing'
        };
      default:
        return {
          icon: <XCircle size={16} color={colors.gray[500]} />,
          color: colors.gray[50],
          textColor: colors.gray[700],
          label: 'Unknown'
        };
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.month}>{payslip.month}</Text>
          <Text style={styles.payDate}>Paid on {formatDate(payslip.payDate)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusDisplay.color }]}>
          {statusDisplay.icon}
          <Text style={[styles.statusText, { color: statusDisplay.textColor }]}>
            {statusDisplay.label}
          </Text>
        </View>
      </View>
      
      <View style={styles.salaryContainer}>
        <View style={styles.salaryItem}>
          <Text style={styles.salaryLabel}>Gross Salary</Text>
          <Text style={styles.salaryValue}>
            {formatCurrency(payslip.grossSalary, payslip.currency)}
          </Text>
        </View>
        <View style={styles.salaryItem}>
          <Text style={styles.salaryLabel}>Deductions</Text>
          <Text style={[styles.salaryValue, { color: colors.error[500] }]}>
            -{formatCurrency(payslip.deductions, payslip.currency)}
          </Text>
        </View>
        <View style={[styles.salaryItem, styles.netSalaryItem]}>
          <Text style={styles.netSalaryLabel}>Net Salary</Text>
          <Text style={styles.netSalaryValue}>
            {formatCurrency(payslip.netSalary, payslip.currency)}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onView}>
          <Eye size={16} color={colors.primary[500]} />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDownload}>
          <Download size={16} color={colors.primary[500]} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    alignItems: 'center',
    marginBottom: 16,
  },
  month: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  payDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
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
  salaryContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
    marginBottom: 16,
  },
  salaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  salaryLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  salaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[800],
  },
  netSalaryItem: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  netSalaryLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.gray[800],
  },
  netSalaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary[500],
    marginLeft: 6,
  },
});

export default PayslipCard;