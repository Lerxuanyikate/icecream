import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Add = ({navigation}) => {
  const[name,setName] = useState("");
  const[pic,setPic] = useState("");
  return (
    <View>
      <StatusBar/>
      <Text>ice Name:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
      <Text>ice Pic URL:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>
      <Text> </Text>  
      <Button title='Submit'
      onPress={()=>{
          let item = {ice_name:name, ice_pic:pic};
          fetch("https://icecream-lux2.onrender.com",
            {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(item)
            }
        )
          .then((response)=>{
            navigation.navigate("Home");
        })
      } 
    }
      />
    </View>
  );
};

export default Add;