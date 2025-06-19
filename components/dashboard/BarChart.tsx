import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { colors } from '@/styles/colors';

const BarChartComponent: React.FC = () => {
  // Mock data for departments
  const data = {
    labels: ['Eng', 'Design', 'Product', 'Marketing', 'Sales', 'HR'],
    datasets: [
      {
        data: [22, 8, 6, 10, 14, 4],
        colors: [
          () => colors.primary[500],
          () => colors.info[500],
          () => colors.secondary[500],
          () => colors.warning[500],
          () => colors.success[500],
          () => colors.error[500],
        ]
      }
    ]
  };
  
  const screenWidth = Dimensions.get('window').width - 48; // Account for padding
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(97, 97, 97, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.6,
    propsForLabels: {
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
    },
  };
  
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
        showValuesOnTopOfBars
        flatColor
        withInnerLines={false}
        withHorizontalLabels={true}
        segments={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BarChartComponent;