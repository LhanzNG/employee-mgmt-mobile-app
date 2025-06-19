import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Download, Eye, Calendar, DollarSign, TrendingUp } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import HeaderBar from '@/components/ui/HeaderBar';
import PayslipCard from '@/components/payslips/PayslipCard';
import SalaryChart from '@/components/payslips/SalaryChart';

export default function PayslipsScreen() {
  const [selectedYear, setSelectedYear] = useState('2023');
  
  // Mock payslip data
  const currentSalary = {
    grossSalary: 8500,
    netSalary: 6800,
    deductions: 1700,
    currency: 'USD'
  };
  
  const payslips = [
    {
      id: '1',
      month: 'April 2023',
      grossSalary: 8500,
      netSalary: 6800,
      deductions: 1700,
      status: 'paid',
      payDate: '2023-04-30',
      currency: 'USD'
    },
    {
      id: '2',
      month: 'March 2023',
      grossSalary: 8500,
      netSalary: 6800,
      deductions: 1700,
      status: 'paid',
      payDate: '2023-03-31',
      currency: 'USD'
    },
    {
      id: '3',
      month: 'February 2023',
      grossSalary: 8500,
      netSalary: 6800,
      deductions: 1700,
      status: 'paid',
      payDate: '2023-02-28',
      currency: 'USD'
    },
    {
      id: '4',
      month: 'January 2023',
      grossSalary: 8500,
      netSalary: 6800,
      deductions: 1700,
      status: 'paid',
      payDate: '2023-01-31',
      currency: 'USD'
    },
  ];
  
  const yearlyStats = {
    totalEarnings: 81600,
    totalDeductions: 20400,
    averageMonthly: 6800,
    bonuses: 5000
  };
  
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Payslips" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Current Salary Overview */}
        <View style={styles.salaryCard}>
          <View style={styles.salaryHeader}>
            <View>
              <Text style={styles.salaryTitle}>Current Month</Text>
              <Text style={styles.salaryMonth}>May 2023</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Processing</Text>
            </View>
          </View>
          
          <View style={styles.salaryBreakdown}>
            <View style={styles.salaryItem}>
              <Text style={styles.salaryLabel}>Gross Salary</Text>
              <Text style={styles.salaryValue}>
                {formatCurrency(currentSalary.grossSalary)}
              </Text>
            </View>
            <View style={styles.salaryItem}>
              <Text style={styles.salaryLabel}>Deductions</Text>
              <Text style={[styles.salaryValue, { color: colors.error[500] }]}>
                -{formatCurrency(currentSalary.deductions)}
              </Text>
            </View>
            <View style={[styles.salaryItem, styles.netSalaryItem]}>
              <Text style={styles.netSalaryLabel}>Net Salary</Text>
              <Text style={styles.netSalaryValue}>
                {formatCurrency(currentSalary.netSalary)}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Yearly Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={colors.gray[700]} />
            <Text style={styles.sectionTitle}>2023 Overview</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <DollarSign size={24} color={colors.success[500]} />
              <Text style={styles.statValue}>
                {formatCurrency(yearlyStats.totalEarnings)}
              </Text>
              <Text style={styles.statLabel}>Total Earnings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {formatCurrency(yearlyStats.averageMonthly)}
              </Text>
              <Text style={styles.statLabel}>Monthly Average</Text>
            </View>
          </View>
        </View>
        
        {/* Salary Chart */}
        <View style={styles.chartContainer}>
          <SalaryChart />
        </View>
        
        {/* Payslip History */}
        <View style={styles.historyContainer}>
          <View style={styles.sectionHeader}>
            <FileText size={20} color={colors.gray[700]} />
            <Text style={styles.sectionTitle}>Payslip History</Text>
          </View>
          
          {payslips.map((payslip) => (
            <PayslipCard 
              key={payslip.id} 
              payslip={payslip}
              onView={() => console.log('View payslip:', payslip.id)}
              onDownload={() => console.log('Download payslip:', payslip.id)}
            />
          ))}
        </View>
        
        <View style={styles.footer} />
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
  salaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  salaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  salaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
  },
  salaryMonth: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.warning[50],
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.warning[700],
  },
  salaryBreakdown: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 16,
  },
  salaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  salaryLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  salaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  netSalaryItem: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  netSalaryLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  netSalaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.primary[500],
  },
  statsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyContainer: {
    marginBottom: 24,
  },
  footer: {
    height: 24,
  },
});