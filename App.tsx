/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const App = () => {
  let Data=[
    { name:"India,",
    city:['Mumbai','Delhi','Patna','Chennai'],
  },
  { name:"USA,",
    city:['California','NewYork','Washington','Texas'],
  },
  { name:"Austrolia,",
    city:['Perth','Melborn','sydini',],
  },
]
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleChangeCountry = (value: any) => {

    setCountry(value);
  };

  const handleCity = (value: any) => {
    setCountry(value);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text>Hello India</Text>
      <StatusBar barStyle={'dark-content'} />

      <Picker
        selectedValue={country}
        onValueChange={(value, _index) => handleChangeCountry(value)}
      >
        <Picker.Item label="select Country" value="select Country" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <Picker
        selectedValue={city}
        onValueChange={(value, _index) => handleCity(value)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red'
  },
});

export default App;
