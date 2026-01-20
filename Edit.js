import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({navigation, route}) => {
  const[name,setName] = useState("");
  const[pic,setPic] = useState("");
  return (
    <View>
      <StatusBar/>
      <Text>Ice Name:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
      <Text>Ice Pic URL:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>  
      <Text> </Text>
      <Button title='Update'
      onPress={()=>{
          fetch("https://icecream-lux2.onrender.com/updateice/"+route.params.id,
            {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ice_name:name, ice_pic:pic})
            }
        )
          .then((response)=>{
            navigation.navigate("Home");
        })
      }
      }
      />
      <Text> </Text>
      <Button title='Delete'
      onPress={()=>{
          fetch("https://icecream-lux2.onrender.com/deleteice/"+route.params.id,
            {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
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

export default Edit;