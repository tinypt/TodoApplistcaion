import React, {useState, useEffect} from 'react';
import {CheckBox, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';
import styled from 'styled-components/native';
// import BEMCheckBox from 'react-native-bem-check-box';

const StyledText = styled.Text`
  font-size: 20px;
  text-align: left;
  color: black;
`;

// const StyledCheckbox = styled.CheckBox`
//   display: inline-block;
//   width: 16px;
//   height: 16px;
//   background: ${props => (props.checked ? 'salmon' : 'pink')};
//   border-radius: 3px;
//   transition: all 150ms;
// `;

export default function Todo(props) {
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
            !show.isDone && (
              <View>
                <CheckBox
                  value={show.isDone}
                  onValueChange={() =>
                    show.isDone
                      ? setData({isDone: false})
                      : setData({isDone: true})
                  }
                />
                <StyledText>{show.todo}</StyledText>
              </View>
            ),
        )}
      </View>
    );
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="To do" component={Feed} />
    </Stack.Navigator>
  );
}
