// Mapa
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import MapView, {Marker, Callout} from 'react-native-maps';
// Marker -> Marcação do Dev no mapa

import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import api from '../services/api';

function Main({ navigation }){
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null); // Sem região inicial
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true, // Buscando via GPS
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          // Cálculos navais, zoom
          latitudeDelta: 0.01, 
          longitudeDelta: 0.01,
        })
      }

    }
    loadInitialPosition()
  }, []);

  async function loadDevs(){
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    console.log(response.data.devs)

    setDevs(response.data.devs)
  }

  function handleRegionChanged(region) {
    // console.log(region)
    setCurrentRegion(region);

  }

  if(!currentRegion) {
    // Só vai exibir o mapa, quando carregar a informação da localização do usuário
    return null;
  }

  return (
  <>
   <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
      {devs.map(dev => (
          <Marker 
          key={dev._id}
          coordinate={{
            longitude:dev.location.coordinates[0],
            latitude:dev.location.coordinates[1]
          }}>
          <Image
           style={styles.avatar}
           source={{ uri:dev.avatar_url }}
          />
          
          <Callout onPress={() => {
            // Navegação
            navigation.navigate('Profile', { github_username: dev.github_username })

          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devBio}>{dev.bio}</Text>
              <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
   </MapView>

          <View style={styles.searchForm}>
              <TextInput 
                  style={styles.searchInput}
                  placeholder="Buscar devs por techs..."
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={techs}
                  onChangeText={setTechs}
              />

              <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name={'my-location'} size={20} color="#FFF"/>
              </TouchableOpacity>
          </View>
  </>
  )
}

const styles = StyleSheet.create({
  map:{
    flex:1
  },
  avatar: {
    width:54,
    height:54,
    borderRadius:4,
    borderWidth:2,
    borderColor:'#fff',
  },
  callout:{
    width:260,
  },
  devName: {
    fontWeight:'bold',
    fontSize:16,
  },
  devBio:{
    color:'#666',
    marginTop:5,
  },
  devTechs:{
    marginTop:5,
  },
  searchForm: {
    position:"absolute",
    top:20,
    left:20,
    right:20,
    zIndex:5, // Força o botão a ficar por cima do mapa
    flexDirection:'row',
  },
  searchInput:{
    flex:1,
    height:50,
    backgroundColor:'#fff',
    color: '#333',
    borderRadius:25,
    paddingHorizontal:20,
    fontSize:16,
    elevation: 3,
  },
  loadButton: {
    width:50,
    height:50,
    backgroundColor:'#2678d8',
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:15,
    elevation:3,
  }
})


export default Main;