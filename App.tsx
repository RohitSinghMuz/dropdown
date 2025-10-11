/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, View } from 'react-native';

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
];
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleChangeCountry = (value: any) => {

    setCountry(value);
    setCity('')
  };

  const handleCity = (value: any) => {
    setCity(value);
  };

  const handleCityName=Data.find((item)=>item.name===country)

  return (
    <View style={styles.container}>

      <StatusBar barStyle={'dark-content'} />

      <Picker
        selectedValue={country}
        onValueChange={(value, _index) => handleChangeCountry(value)}
        style={{padding:10,margin:5}}
      >
        <Picker.Item label="select Country" value="select Country" />
        {
          Data.map((item)=>{
            return(
      <Picker.Item label={item.name} value={item.name}/>
            )
          })
        }
  
      </Picker>

      <Picker
        selectedValue={city}
        onValueChange={(value, _index) => handleCity(value)}
             style={{padding:10,margin:5}}
      >
        <Picker.Item label="Selct City" value="City" />

    {
        handleCityName&&handleCityName.city.map((item)=>{
            return(
      <Picker.Item label={item} value={item}/>
            )
          })
        }
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
