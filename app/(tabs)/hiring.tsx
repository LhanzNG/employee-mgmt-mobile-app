import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clipboard, ArrowRight, CircleAlert as AlertCircle, Briefcase, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { useHiringStore } from '@/store/hiringStore';
import HeaderBar from '@/components/ui/HeaderBar';
import JobCard from '@/components/hiring/JobCard';
import CandidateCard from '@/components/hiring/CandidateCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function HiringScreen() {
  const { jobs, candidates } = useHiringStore();
  const [activeTab, setActiveTab] = useState('jobs');
  
  // Filter candidates by stage
  const applicationStage = candidates.filter(c => c.stage === 'application');
  const interviewStage = candidates.filter(c => c.stage === 'interview');
  const offerStage = candidates.filter(c => c.stage === 'offer');
  
  const renderTabContent = () => {
    if (activeTab === 'jobs') {
      return (
        <View style={styles.jobsContainer}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionHeader}>
              <Clipboard size={20} color={colors.gray[700]} />
              <Text style={styles.sectionTitle}>Open Positions</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
            {jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job}
                onPress={() => router.push(`/hiring/jobs/${job.id}`)}
              />
            ))}
            
            {jobs.length === 0 && (
              <View style={styles.emptyContainer}>
                <Briefcase size={64} color={colors.gray[300]} />
                <Text style={styles.emptyTitle}>No open positions</Text>
                <Text style={styles.emptyText}>
                  Create a new job posting to start hiring
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.candidatesContainer}>
          <View style={styles.stageContainer}>
            <Text style={styles.stageTitle}>Applications ({applicationStage.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {applicationStage.map(candidate => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  onPress={() => router.push(`/hiring/candidates/${candidate.id}`)}
                />
              ))}
              {applicationStage.length === 0 && (
                <View style={styles.emptyStage}>
                  <Text style={styles.emptyStageText}>No applications yet</Text>
                </View>
              )}
            </ScrollView>
          </View>
          
          <View style={styles.stageContainer}>
            <Text style={styles.stageTitle}>Interviews ({interviewStage.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {interviewStage.map(candidate => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  onPress={() => router.push(`/hiring/candidates/${candidate.id}`)}
                />
              ))}
              {interviewStage.length === 0 && (
                <View style={styles.emptyStage}>
                  <Text style={styles.emptyStageText}>No interviews scheduled</Text>
                </View>
              )}
            </ScrollView>
          </View>
          
          <View style={styles.stageContainer}>
            <Text style={styles.stageTitle}>Offers ({offerStage.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offerStage.map(candidate => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  onPress={() => router.push(`/hiring/candidates/${candidate.id}`)}
                />
              ))}
              {offerStage.length === 0 && (
                <View style={styles.emptyStage}>
                  <Text style={styles.emptyStageText}>No offers extended</Text>
                </View>
              )}
            </ScrollView>
          </View>
          
          <View style={styles.alertContainer}>
            <View style={styles.alertHeader}>
              <AlertCircle size={20} color={colors.warning[500]} />
              <Text style={styles.alertTitle}>Action Required</Text>
            </View>
            <Text style={styles.alertText}>4 candidates need interview feedback</Text>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Review Candidates</Text>
              <ArrowRight size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar title="Recruiting" />
      
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'jobs' && styles.activeTab]}
            onPress={() => setActiveTab('jobs')}
          >
            <Text style={[styles.tabText, activeTab === 'jobs' && styles.activeTabText]}>
              Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'candidates' && styles.activeTab]}
            onPress={() => setActiveTab('candidates')}
          >
            <Text style={[styles.tabText, activeTab === 'candidates' && styles.activeTabText]}>
              Candidates
            </Text>
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
        
        <FloatingActionButton
          icon={<Plus size={24} color={colors.white} />}
          onPress={() => router.push(activeTab === 'jobs' ? '/hiring/jobs/add' : '/hiring/candidates/add')}
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
    flexDirection: 'row',
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    padding: 4,
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[600],
  },
  activeTabText: {
    color: colors.primary[500],
  },
  // Jobs Tab Styles
  jobsContainer: {
    flex: 1,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginLeft: 8,
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
  jobsList: {
    flex: 1,
  },
  // Candidates Tab Styles
  candidatesContainer: {
    flex: 1,
  },
  stageContainer: {
    marginBottom: 24,
  },
  stageTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 12,
  },
  emptyStage: {
    width: 200,
    height: 120,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderStyle: 'dashed',
  },
  emptyStageText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[500],
  },
  // Empty State
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
  // Alert container
  alertContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
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
});