import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default function Signup({navigation}) {
  const [text, setText] = useState({user: '', password: ''});

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Sign up!</Text>
      <Text>User :</Text>
      <TextInput
        style={{height: 30, width: 100, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setText({user: text})}
        value={text}
      />
      <Text>Password :</Text>
      <TextInput
        style={{height: 30, width: 100, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setText({password: text})}
        value={text}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Do you have an account?"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </View>
  );
}
