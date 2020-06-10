import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';
import styled from 'styled-components/native';
// import BEMCheckBox from 'react-native-bem-check-box';
// import Checkbox from 'react-native-modest-checkbox';
import {CheckBox, Button} from 'react-native-elements';

const StyledText = styled.Text`
  font-size: 40px;
  text-align: left;
  color: black;
`;

export default function AllList(props) {
  // const [data, setData] = useState({...props.data});
  const {data, setData} = props;

  function Feed() {
    return (
      <View style={styles.container}>
        {/* {_.map(data, show => (
          <View style={styles.checkboxContainer}>
            <CheckBox
              onPress={() => {
                show.isDone
                  ? setData({isDone: false})
                  : setData({isDone: true});
              }}
              checked={show.isDone}
              title={show.todo}
            />
            <Text>{show.todo}</Text>
          </View>
        ))} */}
        <CheckBox title="Click Here" checked={true} />
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.todo}</Text>}
        />
      </View>
    );
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="All" component={Feed} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
