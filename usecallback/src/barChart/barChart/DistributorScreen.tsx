import React from "react";
import { StyleSheet } from "react-native";
import CommonBarChart, {
  ChartItem,
} from "../components/CommonBarChart";
import { SafeAreaView } from "react-native-safe-area-context";

const DistributorScreen: React.FC = () => {
  const distributorData: ChartItem[] = [
    { label: "Distributor 1", value: 24 },
    { label: "Distributor 2", value: 25 },
    { label: "Distributor 3", value: 33 },
    { label: "Distributor 4", value: 36 },
    { label: "Distributor 5", value: 40 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CommonBarChart
        title="Distributor"
        data={distributorData}
        iconText="Dist"
        lowValueThreshold={30}
      />
    </SafeAreaView>
  );
};

export default DistributorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
});