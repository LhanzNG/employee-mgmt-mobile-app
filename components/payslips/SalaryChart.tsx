import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/styles/colors';

const SalaryChart: React.FC = () => {
  // Mock data for monthly salary
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [6800, 6800, 6800, 6800, 7200, 7200],
        color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
        strokeWidth: 3
      }
    ]
  };
  
  const screenWidth = Dimensions.get('window').width - 48;
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
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
    formatYLabel: (value) => `$${(parseInt(value) / 1000).toFixed(0)}k`,
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salary Trend (2023)</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        bezier
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

export default SalaryChart;