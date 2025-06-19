import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, Clock, FileText, Filter } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import HeaderBar from '@/components/ui/HeaderBar';
import RequestCard from '@/components/requests/RequestCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function RequestsScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Mock requests data
  const requests = [
    {
      id: '1',
      type: 'leave',
      title: 'Annual Leave Request',
      description: 'Family vacation to Europe',
      startDate: '2023-06-15',
      endDate: '2023-06-25',
      days: 8,
      status: 'pending',
      submittedDate: '2023-05-10',
      approver: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'remote',
      title: 'Work From Home',
      description: 'Medical appointment and recovery',
      startDate: '2023-05-15',
      endDate: '2023-05-15',
      days: 1,
      status: 'approved',
      submittedDate: '2023-05-08',
      approver: 'Sarah Johnson'
    },
    {
      id: '3',
      type: 'expense',
      title: 'Conference Expenses',
      description: 'React Native Conference 2023',
      amount: 1250,
      currency: 'USD',
      status: 'approved',
      submittedDate: '2023-05-05',
      approver: 'Michael Brown'
    },
    {
      id: '4',
      type: 'leave',
      title: 'Sick Leave',
      description: 'Medical treatment',
      startDate: '2023-04-20',
      endDate: '2023-04-22',
      days: 3,
      status: 'rejected',
      submittedDate: '2023-04-18',
      approver: 'Sarah Johnson',
      rejectionReason: 'Insufficient sick leave balance'
    },
    {
      id: '5',
      type: 'overtime',
      title: 'Overtime Request',
      description: 'Project deadline completion',
      hours: 10,
      status: 'approved',
      submittedDate: '2023-04-15',
      approver: 'Sarah Johnson'
    }
  ];
  
  // Filter requests based on active tab
  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    return request.status === activeTab;
  });
  
  // Get request counts for tabs
  const getRequestCount = (status: string) => {
    if (status === 'all') return requests.length;
    return requests.filter(req => req.status === status).length;
  };
  
  const handleNewRequest = () => {
    console.log('Create new request');
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Requests" />
      
      <View style={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text 
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({getRequestCount(tab)})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Filter and Summary */}
        <View style={styles.headerContainer}>
          <Text style={styles.summaryText}>
            {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.gray[700]} />
          </TouchableOpacity>
        </View>
        
        {/* Requests List */}
        <ScrollView style={styles.requestsList} showsVerticalScrollIndicator={false}>
          {filteredRequests.map(request => (
            <RequestCard 
              key={request.id} 
              request={request}
              onPress={() => console.log('View request:', request.id)}
            />
          ))}
          
          {filteredRequests.length === 0 && (
            <View style={styles.emptyContainer}>
              <FileText size={64} color={colors.gray[300]} />
              <Text style={styles.emptyTitle}>No requests found</Text>
              <Text style={styles.emptyText}>
                {activeTab === 'all' 
                  ? "You haven't submitted any requests yet" 
                  : `No ${activeTab} requests found`
                }
              </Text>
            </View>
          )}
          
          <View style={styles.footer} />
        </ScrollView>
        
        <FloatingActionButton
          icon={<Plus size={24} color={colors.white} />}
          onPress={handleNewRequest}
        />
      </View>
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
  tabContainer: {
    marginVertical: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  activeTab: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  activeTabText: {
    color: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  filterButton: {
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  requestsList: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.gray[700],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    maxWidth: '80%',
  },
  footer: {
    height: 80,
  },
});