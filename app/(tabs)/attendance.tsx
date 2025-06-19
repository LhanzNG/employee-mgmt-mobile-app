import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, CircleCheck as CheckCircle, Circle as XCircle, MapPin, TrendingUp } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import HeaderBar from '@/components/ui/HeaderBar';
import AttendanceCard from '@/components/attendance/AttendanceCard';
import AttendanceChart from '@/components/attendance/AttendanceChart';

export default function AttendanceScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Mock attendance data
  const todayAttendance = {
    checkIn: '09:15 AM',
    checkOut: null,
    status: 'present',
    workingHours: '7h 45m',
    location: 'Office - Floor 3'
  };
  
  const weeklyStats = {
    totalDays: 5,
    presentDays: 4,
    lateDays: 1,
    absentDays: 0,
    totalHours: '38h 30m',
    averageHours: '7h 42m'
  };
  
  const recentAttendance = [
    { date: '2023-05-10', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: '8h 45m', status: 'present' },
    { date: '2023-05-09', checkIn: '09:30 AM', checkOut: '06:15 PM', hours: '8h 45m', status: 'late' },
    { date: '2023-05-08', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 00m', status: 'present' },
    { date: '2023-05-07', checkIn: '09:10 AM', checkOut: '06:30 PM', hours: '9h 20m', status: 'present' },
    { date: '2023-05-06', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9h 05m', status: 'present' },
  ];
  
  const handleCheckInOut = () => {
    // Handle check-in/check-out logic
    console.log('Check-in/out pressed');
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Attendance" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Today's Status */}
        <View style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <View>
              <Text style={styles.todayTitle}>Today's Status</Text>
              <Text style={styles.todayDate}>Wednesday, May 10, 2023</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: colors.success[50] }]}>
              <CheckCircle size={16} color={colors.success[500]} />
              <Text style={[styles.statusText, { color: colors.success[700] }]}>Present</Text>
            </View>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Check In</Text>
              <Text style={styles.timeValue}>{todayAttendance.checkIn}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Check Out</Text>
              <Text style={styles.timeValue}>{todayAttendance.checkOut || '--:--'}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Working Hours</Text>
              <Text style={styles.timeValue}>{todayAttendance.workingHours}</Text>
            </View>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.gray[500]} />
            <Text style={styles.locationText}>{todayAttendance.location}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkButton} onPress={handleCheckInOut}>
            <Clock size={20} color={colors.white} />
            <Text style={styles.checkButtonText}>
              {todayAttendance.checkOut ? 'Checked Out' : 'Check Out'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Weekly Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={colors.gray[700]} />
            <Text style={styles.sectionTitle}>Weekly Overview</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.presentDays}</Text>
              <Text style={styles.statLabel}>Present Days</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.lateDays}</Text>
              <Text style={styles.statLabel}>Late Days</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.totalHours}</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyStats.averageHours}</Text>
              <Text style={styles.statLabel}>Avg Hours</Text>
            </View>
          </View>
        </View>
        
        {/* Attendance Chart */}
        <View style={styles.chartContainer}>
          <AttendanceChart />
        </View>
        
        {/* Recent Attendance */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color={colors.gray[700]} />
            <Text style={styles.sectionTitle}>Recent Attendance</Text>
          </View>
          
          {recentAttendance.map((record, index) => (
            <AttendanceCard key={index} record={record} />
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
  todayCard: {
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
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  todayTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[800],
  },
  todayDate: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 6,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.primary[500],
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
  recentContainer: {
    marginBottom: 24,
  },
  footer: {
    height: 24,
  },
});