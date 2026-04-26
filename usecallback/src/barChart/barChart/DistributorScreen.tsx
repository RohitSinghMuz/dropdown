import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const DistributorChart: React.FC = () => {

  const data = [
    {
      value: 24,
      label: "Distributor 1",
      frontColor: "#E53935",
      topLabelComponent: () => (
        <Text style={styles.redLabel}>24%</Text>
      ),
    },
    {
      value: 25,
      label: "Distributor 2",
      frontColor: "#E53935",
      topLabelComponent: () => (
        <Text style={styles.redLabel}>25%</Text>
      ),
    },
    {
      value: 33,
      label: "Distributor 3",
      frontColor: "#2E7D32",
      topLabelComponent: () => (
        <Text style={styles.greenLabel}>33%</Text>
      ),
    },
    {
      value: 36,
      label: "Distributor 4",
      frontColor: "#2E7D32",
      topLabelComponent: () => (
        <Text style={styles.greenLabel}>36%</Text>
      ),
    },
    {
      value: 40,
      label: "Distributor 5",
      frontColor: "#2E7D32",
      topLabelComponent: () => (
        <Text style={styles.greenLabel}>40%</Text>
      ),
    },
  ];

  return (
    <View style={styles.card}>
      
      {/* Title */}
      <Text style={styles.title}>📦 Distributor</Text>

      {/* Chart */}
      <BarChart
        data={data}
        maxValue={100}
        barWidth={32}
        spacing={30}
        roundedTop
        hideRules={false}
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={5}
        isAnimated
      />
    </View>
  );
};

export default DistributorChart;


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },

  redLabel: {
    color: "#E53935",
    fontWeight: "600",
    marginBottom: 6,
  },

  greenLabel: {
    color: "#2E7D32",
    fontWeight: "600",
    marginBottom: 6,
  },
});