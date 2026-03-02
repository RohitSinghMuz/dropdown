import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import DistributorScreen from './usecallback/src/barChart/barChart/DistributorScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      <DistributorScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
});
export default App;
