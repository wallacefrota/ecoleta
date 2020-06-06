// importing modules
import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Image, StyleSheet, Alert} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
// interfaces
interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}
interface SelectedOptionUf {
  label: string;
  value: string
}
// page home
const Home = () => {
  // state
  const [ufs, setUfs] = useState<SelectedOptionUf[]>([]);
  const [cities, setCities] = useState<SelectedOptionUf[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();
// load all ufs Brazil
useEffect(() => {
  async function loadUfs() {
   const response = await axios.get<IBGEUFResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
    const ufsInitials = response.data.map(uf => {
      return {
        label: uf.sigla,
        value: uf.sigla
      }
    })
      setUfs(ufsInitials);
    }
  loadUfs();
}, []);
// load all cities Brazil
useEffect(() => {
    // condition case not select uf
    if(selectedUf === '0') return;

    // load citys forever user select uf
    async function loadCities() {
      const response = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);

      const citiesName = response.data.map(city => {
        return {
          label: city.nome,
          value: city.nome
        }
      });

      setCities(citiesName)
    }
    loadCities();
}, [selectedUf]);

// function navigate point passing params city and uf selected
function handleNavigatePoints() {
    if(selectedUf === '0' || selectedCity === '0') {
      Alert.alert('Oooops...', 'Seleciona as opçoes.');
      return;
    } else {
      navigation.navigate('Points', {uf: selectedUf, city: selectedCity})
    }
}

 return (
     <ImageBackground 
        source={require('../../assets/home-background.png')}
        imageStyle={{width: 274, height: 368}}
        style={styles.container}
     >
         <View style={styles.main}>
            <Image source={require('../../assets/logo.png')}/>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
         </View>
         <View style={styles.footer}>
           {ufs.length > 0 && (
              <RNPickerSelect
              placeholder={{
                label: 'Selecione UF',
                value: '0'
              }}
                  style={{ ...selectOptionStyle }}
                  onValueChange={(value) => {
                    setSelectedUf(String(value));
                    setSelectedCity('0')
                  }}
                  items={ufs}
              />
           )}
          
           {selectedUf !== '0' && (
             <RNPickerSelect 
                placeholder={{
                  label: 'Selecione a cidade',
                  value: '0'
                }}
                style={{ ...selectOptionStyle }}
                onValueChange={(value) => setSelectedCity(String(value))}
                items={cities}
             />
           )}
            
            <RectButton  style={styles.button} onPress={handleNavigatePoints}>
              <View style={styles.buttonIcon}>
                <Text style={{fontSize: 24, color: "#fff", textAlign: 'center', fontWeight: 'bold'}}>
                  >
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
         </View>
     </ImageBackground>
 )
}
// styles
const selectOptionStyle = StyleSheet.create({
  viewContainer: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingLeft: 22,
    fontSize: 16,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: .5,
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  }
});
export default Home;