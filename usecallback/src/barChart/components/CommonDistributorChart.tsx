import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";

export interface ChartItem {
  label: string;
  value: number;
}

interface CommonDistributorChartProps {
  title: string;
  data: ChartItem[];
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  lowValueThreshold?: number;
  iconText?: string;
}

const CommonDistributorChart: React.FC<CommonDistributorChartProps> = ({
  title,
  data,
  containerStyle,
  titleStyle,
  lowValueThreshold = 30,
  iconText = "Dist",
}) => {
  const barData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor:
      item.value < lowValueThreshold ? "#D9534F" : "#2EAD62",
    topLabelComponent: () => (
      <Text style={styles.topLabel}>
        {item.value}%
      </Text>
    ),
  }));

  return (
    <View style={[styles.card, containerStyle]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{iconText}</Text>
        </View>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>

      <BarChart
        data={barData}
        barWidth={30}
        spacing={40}
        barBorderTopLeftRadius={5}
        barBorderTopRightRadius={5}
        roundedBottom={false}
        hideRules={false}
        rulesType="dashed"
        rulesColor="#E5E5E5"
        dashWidth={4}
        dashGap={4}
        showVerticalLines
        verticalLinesColor="#E5E5E5"
        verticalLinesThickness={1}
        verticalLinesStrokeDashArray={[4, 4]}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{ color: "#999" }}
        xAxisLabelTextStyle={styles.xLabel}
        noOfSections={5}
        maxValue={100}
        initialSpacing={0}
        yAxisLabelSuffix="%"
        showYAxisIndices
      />
    </View>
  );
};

export default CommonDistributorChart;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconBox: {
    backgroundColor: "#F4E8D5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  iconText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C28C45",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#C28C45",
  },
  topLabel: {
    color: "#2EAD62",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  xLabel: {
    color: "#444",
    fontSize: 12,
    textAlign: "center",
  },
});