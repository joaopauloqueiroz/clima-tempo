import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Container} from './styles';
import {general} from '../../styles/';
import api from '../../services/api';
import Item from './item';
import Preloader from '../Loader';
import SearchableDropdown from 'react-native-searchable-dropdown';

const cities = [
  {id: '0', name: 'Selecione uma cidade'},
  {id: '455827', name: 'São Paulo'},
  {id: '447216', name: 'Rio Branco'},
  {id: '90200707', name: 'Rio de Janeiro'},
  {id: '455833', name: 'Manaus'},
  {id: '455936', name: 'Boa Vista'},
  {id: '455820', name: 'Belém'},
  {id: '455820', name: 'Belém'},
  {id: '455970', name: 'Macapá'},
  {id: '455901', name: 'Porto Velho'},
  {id: '457721', name: 'Palmas'},
  {id: '455880', name: 'Maceió'},
];

export default function index() {
  const [climate, setClimate] = useState({});
  const [loader, setLoader] = useState(true);
  const [city, setCity] = useState({id: '455827', name: 'São Paulo'});
  useEffect(() => {
    init(city.id);
    setInterval(() => {
      init(city.id);
    }, 600000);
  }, []);

  const init = async id => {
    setLoader(true);
    try {
      const climateReceived = await api.get(`weather?woeid=${id}&key=bd1a5133`);
      setClimate(climateReceived.data.results);
      setLoader(false);
    } catch (error) {}
  };

  const findCity = async item => {
    try {
      setCity(item);
      init(item.id);
    } catch (error) {}
  };

  return (
    <View
      style={{
        backgroundColor: '#015379',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
      }}>
      <Container>
        <SearchableDropdown
          selectedItems={[city]}
          onItemSelect={item => {
            if (item.id !== '0') {
              setCity(item);
              findCity(item);
            }
          }}
          defaultIndex={1}
          itemStyle={{
            width: 300,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          textInputStyle={{
            //inserted text style
            width: 300,
            justifyContent: 'center',
            alignSelf: 'stretch',
            padding: 5,
            margin: 0,
            borderWidth: 1,
            opacity: 0.8,
            /*color: '#ddd',*/
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
            borderRadius: 4,
          }}
          itemTextStyle={{color: '#222', width: '100%'}}
          itemsContainerStyle={{maxHeight: 180, width: '100%'}}
          items={cities}
        />
        {loader ? (
          <Preloader />
        ) : (
          climate.forecast && (
            <Item data={climate} forecast={climate.forecast} />
          )
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  ...general,
});
