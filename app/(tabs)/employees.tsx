import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, MoveVertical as MoreVertical, UserPlus } from 'lucide-react-native';
import { router } from 'expo-router';

import { colors } from '@/styles/colors';
import { useEmployeeStore } from '@/store/employeeStore';
import HeaderBar from '@/components/ui/HeaderBar';
import EmployeeCard from '@/components/employees/EmployeeCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

export default function EmployeesScreen() {
  const { employees } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Filter employees based on search query and filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && employee.department.toLowerCase() === selectedFilter.toLowerCase();
  });
  
  // Get unique departments for filter options
  const departments = ['all', ...new Set(employees.map(emp => emp.department.toLowerCase()))];
  
  const handleAddEmployee = () => {
    router.push('/employees/add');
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderBar 
        title="Employees" 
        rightIcon={<MoreVertical color={colors.gray[700]} size={24} />}
      />
      
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search employees..."
              placeholderTextColor={colors.gray[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.gray[700]} />
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
          {departments.map((department, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === department && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(department)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  selectedFilter === department && styles.filterChipTextActive
                ]}
              >
                {department === 'all' ? 'All' : department.charAt(0).toUpperCase() + department.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
          </Text>
        </View>
        
        <ScrollView style={styles.employeeList} showsVerticalScrollIndicator={false}>
          {filteredEmployees.map(employee => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee}
              onPress={() => router.push(`/employees/${employee.id}`)}
            />
          ))}
          
          {filteredEmployees.length === 0 && (
            <View style={styles.emptyContainer}>
              <UserPlus size={64} color={colors.gray[300]} />
              <Text style={styles.emptyTitle}>No employees found</Text>
              <Text style={styles.emptyText}>
                {searchQuery 
                  ? "Try a different search term or filter" 
                  : "Add your first employee to get started"
                }
              </Text>
            </View>
          )}
          
          <View style={styles.footer} />
        </ScrollView>
        
        <FloatingActionButton
          icon={<Plus size={24} color={colors.white} />}
          onPress={handleAddEmployee}
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
  searchContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: colors.gray[800],
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: colors.white,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  filterScrollView: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  filterChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  filterChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  filterChipTextActive: {
    color: colors.white,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  employeeList: {
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