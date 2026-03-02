import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export interface ChartItem {
  label: string;
  value: number;
}

interface CommonBarChartProps {
  title: string;
  data: ChartItem[];
  height?: number;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  lowValueThreshold?: number;
  iconText?: string; // 👈 Text icon support
}

const CommonBarChart: React.FC<CommonBarChartProps> = ({
  title,
  data,
  height = 260,
  containerStyle,
  titleStyle,
  lowValueThreshold = 30,
  iconText = 'ICON',
}) => {
  const labels: string[] = data.map(item => item.label);
  const values: number[] = data.map(item => item.value);

  return (
    <View style={[styles.card, containerStyle]}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{iconText}</Text>
        </View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>

      <BarChart
        data={{
          labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={screenWidth - 40}
        height={height}
        yAxisLabel=""
        fromZero
        yAxisSuffix="%"
        yAxisInterval={1}
        showValuesOnTopOfBars
        withInnerLines
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1, index?: number) => {
            if (typeof index === 'number') {
              const value = values[index];
              return value < lowValueThreshold
                ? `rgba(220, 53, 69, ${opacity})`
                : `rgba(40, 167, 69, ${opacity})`;
            }
            return `rgba(40, 167, 69, ${opacity})`;
          },
          labelColor: () => '#666',
          propsForBackgroundLines: {
            stroke: '#e0e0e0',
            strokeWidth: 1,
          },
        }}
        style={styles.chartStyle}
      />
    </View>
  );
};

export default CommonBarChart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
