import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/styles/colors';

const AttendanceChart: React.FC = () => {
  // Mock data for weekly attendance hours
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [8.5, 8.75, 9.0, 8.25, 9.2, 4.5],
        color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };
  
  const screenWidth = Dimensions.get('window').width - 48;
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(97, 97, 97, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary[500]
    },
    propsForLabels: {
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
    },
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Hours Trend</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        bezier
        fromZero
        segments={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default AttendanceChart;