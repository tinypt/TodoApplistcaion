/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons';
import AllList from './src/views/allList';
import Todo from './src/views/todo';
import Done from './src/views/done';
import Signup from './src/views/signupScreen';
import Login from './src/views/loginScreen';
import styled from 'styled-components/native';
import {Overlay, Button} from 'react-native-elements';

const FloatingButtonStyle = styled.Image`
  /* resizemode: 'contain'; */
  width: 50px;
  height: 50px;
`;

const TouchableOpacityStyle = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  right: 30px;
  bottom: 110px;
`;

const TextInputStyle = styled.TextInput`
  height: 40px;
  width: 300px;
  border-color: gray;
  border-width: 1px;
`;

const App: () => React$Node = () => {
  const [data, setData] = useState([
    {todo: 'swimming', isDone: false},
    {todo: 'table tennis', isDone: true},
    {todo: 'running', isDone: false},
    {todo: 'funny', isDone: true},
  ]);
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setData(data);
  }, [data]);

  const clickHandler = () => {
    setVisible(!visible);
  };

  const clickLogin = () => {
    setIsLogin(true);
  };

  const Tab = createBottomTabNavigator();

  function AllListComponent() {
    return <AllList data={data} setData={setData} />;
  }
  function TodoComponent() {
    return <Todo data={data} />;
  }
  function DoneComponent() {
    return <Done data={data} />;
  }
  function SignupComponent() {
    return <Signup />;
  }
  function LoginComponent() {
    return <Login confirm={isLogin} onLogin={clickLogin} />;
  }

  const Stack = createStackNavigator();

  const addHandleSubmit = () => {
    // setData([...data, {todo: {newTodo}, isDone: false}]);
    // const todo = {newTodo};
    setData(data => data.concat({todo: newTodo, isDone: false}));
    console.log(newTodo);
    setVisible(false)
    setNewTodo('');
  };

  return (
    <>
      <NavigationContainer>
        {!isLogin ? (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Signup" component={SignupComponent} />
            <Stack.Screen name="Login" component={LoginComponent} />
          </Stack.Navigator>
        ) : (
          <>
            <Tab.Navigator>
              <Tab.Screen
                name="Feed"
                component={AllListComponent}
                options={{title: 'All'}}
              />
              <Tab.Screen
                name="Todo"
                component={TodoComponent}
                options={{title: 'To do'}}
              />
              <Tab.Screen
                name="Done"
                component={DoneComponent}
                options={{title: 'Done'}}
              />
            </Tab.Navigator>
            <TouchableOpacityStyle activeOpacity={0.7} onPress={clickHandler}>
              <FloatingButtonStyle
                source={require('./images/baseline_add_circle_black_18dp.png')}
              />
            </TouchableOpacityStyle>
            <Overlay isVisible={visible} onBackdropPress={clickHandler}>
              <Text>Add new todo</Text>
              <TextInputStyle
                onChangeText={text => setNewTodo(text)}
                value={newTodo}
                autoFocus={true}
              />
              <Button title="add" type="outline" onPress={addHandleSubmit} />
            </Overlay>
          </>
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
