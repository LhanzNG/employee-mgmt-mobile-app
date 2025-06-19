import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, DollarSign, FileText, Newspaper, ArrowRight, Users, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { useEmployeeStore } from '@/store/employeeStore';
import { useAuthStore } from '@/store/authStore';
import HeaderBar from '@/components/ui/HeaderBar';
import StatsCard from '@/components/dashboard/StatsCard';
import ActivityCard from '@/components/dashboard/ActivityCard';
import BarChartComponent from '@/components/dashboard/BarChart';

export default function DashboardScreen() {
  const { employees } = useEmployeeStore();
  const { user } = useAuthStore();
  
  // Calculate summary statistics
  const totalEmployees = employees.length;
  const newHires = employees.filter(emp => {
    const hireDate = new Date(emp.hireDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return hireDate > oneMonthAgo;
  }).length;
  
  // Mock data for quick stats
  const todayStats = {
    attendance: { present: 8, total: 10, percentage: 80 },
    pendingRequests: 3,
    upcomingPayroll: '2023-05-31',
    unreadNews: 2
  };
  
  // Recent activities (mock data)
  const recentActivities = [
    { id: 1, type: 'hire', name: 'John Smith', position: 'Software Engineer', date: '2023-05-10' },
    { id: 2, type: 'interview', name: 'Sarah Johnson', position: 'UX Designer', date: '2023-05-09' },
    { id: 3, type: 'application', name: 'Mike Brown', position: 'Product Manager', date: '2023-05-08' },
    { id: 4, type: 'promotion', name: 'Emily Wilson', position: 'Senior Developer', date: '2023-05-07' },
  ];
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Dashboard" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hello, {user?.name}</Text>
          <Text style={styles.welcomeText}>Welcome to your HR Dashboard</Text>
        </View>
        
        {/* Quick Access Cards */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => router.push('/attendance')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.primary[50] }]}>
                <Clock size={24} color={colors.primary[500]} />
              </View>
              <Text style={styles.quickAccessTitle}>Attendance</Text>
              <Text style={styles.quickAccessSubtitle}>
                {todayStats.attendance.present}/{todayStats.attendance.total} Present Today
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => router.push('/payslips')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.success[50] }]}>
                <DollarSign size={24} color={colors.success[500]} />
              </View>
              <Text style={styles.quickAccessTitle}>Payslips</Text>
              <Text style={styles.quickAccessSubtitle}>Next: May 31, 2023</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => router.push('/requests')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.warning[50] }]}>
                <FileText size={24} color={colors.warning[500]} />
              </View>
              <Text style={styles.quickAccessTitle}>Requests</Text>
              <Text style={styles.quickAccessSubtitle}>
                {todayStats.pendingRequests} Pending
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => router.push('/news')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.info[50] }]}>
                <Newspaper size={24} color={colors.info[500]} />
              </View>
              <Text style={styles.quickAccessTitle}>News</Text>
              <Text style={styles.quickAccessSubtitle}>
                {todayStats.unreadNews} New Articles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Today's Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <CheckCircle size={20} color={colors.success[500]} />
              </View>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>Attendance</Text>
                <Text style={styles.summaryValue}>
                  {todayStats.attendance.percentage}% Present
                </Text>
              </View>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Calendar size={20} color={colors.primary[500]} />
              </View>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>Working Hours</Text>
                <Text style={styles.summaryValue}>7h 45m</Text>
              </View>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <FileText size={20} color={colors.warning[500]} />
              </View>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryLabel}>Pending Tasks</Text>
                <Text style={styles.summaryValue}>3 Items</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatsCard 
            title="Total Employees"
            value={totalEmployees}
            icon={<Users size={24} color={colors.primary[500]} />}
            color={colors.primary[50]}
            onPress={() => router.push('/employees')}
          />
          <StatsCard 
            title="New Hires"
            value={newHires}
            icon={<Users size={24} color={colors.success[500]} />}
            color={colors.success[50]}
            subtitle="This month"
            onPress={() => router.push('/employees')}
          />
        </View>
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <TrendingUp size={20} color={colors.gray[700]} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Department Overview</Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <BarChartComponent />
        </View>
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <TrendingUp size={20} color={colors.gray[700]} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.activitiesContainer}>
          {recentActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
        
        <View style={styles.alertContainer}>
          <View style={styles.alertHeader}>
            <AlertCircle size={20} color={colors.warning[500]} />
            <Text style={styles.alertTitle}>Action Required</Text>
          </View>
          <Text style={styles.alertText}>3 employees have upcoming performance reviews</Text>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Schedule Reviews</Text>
            <ArrowRight size={16} color={colors.white} />
          </TouchableOpacity>
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
  welcomeSection: {
    marginVertical: 16,
  },
  greeting: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.gray[800],
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  quickAccessContainer: {
    marginBottom: 24,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.gray[800],
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.gray[600],
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 2,
  },
  summaryValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  sectionIcon: {
    marginRight: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary[500],
    marginRight: 4,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  alertContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginLeft: 8,
  },
  alertText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 16,
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warning[500],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  alertButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.white,
    marginRight: 8,
  },
  footer: {
    height: 24,
  },
});