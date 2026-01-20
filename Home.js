import React,{useState, useEffect} from 'react';
import {StatusBar, Button, FlatList, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Touchable} from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
   const [myData, setMyData] = useState([]);
  
  const myurl = "https://icecream-lux2.onrender.com/allice"
  
  useEffect(()=>{
  fetch(myurl)
  .then((response)=>{
    return response.json();
  })
  .then((myJson)=>{
        setMyData(myJson);
        originalData=myJson;
  })},[]);

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item) => 
        //1D - Use of toLowerCase
        item.ice_name.toLowerCase().includes(text.toLowerCase()));
      setMyData(myFilteredData);
    }
    else {
      setMyData(originalData);
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate("Edit", {id: item.id, name: item.ice_name, pic: item.ice_pic})
      }
    }> 

    <View style={{flexDirection:"row", alignItems:"center",borderWidth:1}}>
    <View style={{flex:1}}><Text style={{fontWeight:"bold", margin:10}}>{item.ice_name}</Text></View>
    <View style={{flex:1}}><Image source={{uri:item.ice_pic}} style={{width:150,height:200, margin:10}}></Image></View>
    </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <StatusBar translucent={false}/>
      <Text style={{fontWeight:"bold"}}>Search:</Text>
      <TextInput style={{borderWidth:1, margin:10}} onChangeText={(text)=>{FilterData(text)}}/>
        <Button title='Add ice' onPress={()=>{navigation.navigate("Add")}}/>
      <FlatList style={{margin:10}} data={myData} renderItem={renderItem} />
    </View>
  );
};

export default Home;