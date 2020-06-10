import React, {useState, useEffect} from 'react';
import {CheckBox, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';

export default function Done(props) {
  const [data, setData] = useState({...props.data});

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  function Feed() {
    return (
      <View>
        {_.map(
          data,
          show =>
            show.isDone && (
              <View>
                <CheckBox
                  value={show.isDone}
                  onValueChange={() =>
                    show.isDone
                      ? setData({isDone: false})
                      : setData({isDone: true})
                  }
                />
                <Text>{show.todo}</Text>
              </View>
            ),
        )}
      </View>
    );
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Done" component={Feed} />
    </Stack.Navigator>
  );
}
