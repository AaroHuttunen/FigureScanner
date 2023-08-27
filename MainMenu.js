import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FigureTemplateScreen from './components/FigureTemplateScreen';
import FigureListScreen from './components/FigureListScreen';
import FigureScreen from './components/FigureScreen';
import styles  from './components/Styles.js';

const Stack = createStackNavigator();
const logo = require('./images/logo.jpg');

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.mainMenuButton} onPress={onPress}>
      <Text style={styles.mainMenuButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainMenuContainer}>
      <View style={styles.header}>
        <Text style={styles.appName}>Figure Scanner</Text>
      </View>
      <Image source={logo} style={styles.logoImage} />
      <View style={styles.mainMenuButtonContainer}>
        <CustomButton title="Scan Figure" onPress={() => navigation.navigate('ScanFigure')} />
        <CustomButton title="Figure List" onPress={() => navigation.navigate('FigureList')} />
        <CustomButton title="Figure templates" onPress={() => navigation.navigate('FigureTemplate')} />
      </View>
    </View>
  );
}

function MainMenu() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, animationEnabled: false,}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanFigure" component={FigureScreen} />
        <Stack.Screen name="FigureList" component={FigureListScreen} />
        <Stack.Screen name="FigureTemplate" component={FigureTemplateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainMenu;