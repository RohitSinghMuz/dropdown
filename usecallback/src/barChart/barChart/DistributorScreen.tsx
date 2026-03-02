import React from "react";
import { StyleSheet } from "react-native";
import CommonDistributorChart, {
  ChartItem,
} from "../components/CommonDistributorChart";
import { SafeAreaView } from "react-native-safe-area-context";

const DistributorScreen: React.FC = () => {
  const distributorData: ChartItem[] = [
    { label: "Dist 1", value: 24 },
    { label: "Dist 2", value: 25 },
    { label: "Dist 3", value: 33 },
    { label: "Dist 4", value: 36 },
    { label: "Dist 5", value: 40 },
    { label: "Dist 6", value: 33 },
    { label: "Dist 7", value: 36 },
    { label: "Dist 8", value: 40 },
    { label: "Dist 9", value: 33 },
    { label: "Dist 10", value: 36 },
    { label: "Dist 11", value: 40 },
    { label: "Dist 12", value: 33 },
    { label: "Dist 13", value: 36 },
    { label: "Dist 14", value: 40 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CommonDistributorChart
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
    backgroundColor: "#F5F6FA",
    padding: 10,
  },
});