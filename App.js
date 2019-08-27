

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Provider } from 'react-redux'
import { Platform, StyleSheet, Text, View, StatusBar, SafeAreaView, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";

import store from './src/redux/store'
import MyComponent from './src/components/MyComponent'

/* const TabNavigator = createMaterialBottomTabNavigator(  
  {  
      Home: {
         screen: MyComponent,  
          navigationOptions:{  
              tabBarLabel:'Home',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                       
                  </View>),  
          }  
      },  
      Profile: { screen: MyComponent,  
          navigationOptions:{  
              tabBarLabel:'Profile',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                        
                  </View>),  
              activeColor: '#f60c0d',  
              inactiveColor: '#f65a22',  
              barStyle: { backgroundColor: '#f69b31' },  
          }  
      },  
      Image: { screen: MyComponent,  
          navigationOptions:{  
              tabBarLabel:'History',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                        
                  </View>),  
              activeColor: '#615af6',  
              inactiveColor: '#46f6d7',  
              barStyle: { backgroundColor: '#67baf6' },  
          }  
      },  
      Cart: {  
          screen: MyComponent,  
          navigationOptions:{  
              tabBarLabel:'Cart',  
              tabBarIcon: ({ tintColor }) => (  
                  <View>  
                      
                  </View>),  
          }  
      },  
  },  
  {  
    initialRouteName: "Home",  
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },  
  },  
);  

const AppContainer = createAppContainer(TabNavigator);   */
const RootStack = createStackNavigator(
  {
    Home: MyComponent,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {

    return <Provider store={store}>
      <AppContainer />
    </Provider>;
  }
}
