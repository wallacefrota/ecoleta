// importing modules
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import {FontAwesome5, Feather as Icon} from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import Constants from 'expo-constants';
import api from '../../services/api';

// interfaces
interface Params {
  point_id: number
}
// set state format
interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string
  };
  items: {
    title: string;
  }[];
}
const Detail = () => {
  // state
    const [data, setData] = useState<Data>({} as Data)
    const navigation = useNavigation();
    const route = useRoute();
  // getting the passed parameters
    const routeParams = route.params as Params;
  // loading point according to id
    useEffect(() => {
      api.get(`/points/${routeParams.point_id}`).then(response => {
        setData(response.data)
      })
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }
    // call app email send data predefined
    function handleComposeMail() {
      MailComposer.composeAsync({
        subject: 'Interesse na coleta de resíduos',
        recipients: [data.point.email]
      })
    }
    // call send message whatsapp
    function handleWhatsapp() {
      Linking.openURL(`whatsapp://send?phone${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
    }
    if (!data.point) {
      return null
    }
        return(
            <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
               <TouchableOpacity onPress={handleNavigateBack}>
                    <FontAwesome5 name="arrow-left" color="#34CB79" size={20}/>
                </TouchableOpacity>

                  <Image style={styles.pointImage} source={{uri: data.point.image_url}}/>
                  <Text style={styles.pointName}>{data.point.name}</Text>
                  <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome5 name="whatsapp" color="#fff" size={20}/>
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" color="#fff" size={20}/>
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
            </SafeAreaView>
        )
}
// styles application
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      marginTop: 24,
    },
  
    pointItems: {
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontSize: 16,
    },
  
    addressContent: {
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
    },
  });
export default Detail;