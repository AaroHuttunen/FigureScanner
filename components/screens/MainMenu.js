import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FigureTemplateScreen from '../screens/FigureTemplateScreen';
import FigureListScreen from '../screens/FigureListScreen';
import FigureScreen from '../screens/FigureScreen';
import styles  from '../styles/Styles.js';
import Button  from '../components/Button.js';

const Stack = createStackNavigator();
const logo = require('../images/logo.jpg');

function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainMenuContainer}>
      <View style={styles.header}>
        <Text style={styles.appName}>Figure Scanner</Text>
      </View>
      <Image source={logo} style={styles.logoImage} />
      <View>
        <Button style={styles.mainMenuButton} textStyle={styles.mainMenuButtonText} title="Scan Figure" onPress={() => navigation.navigate('ScanFigure')} />
        <Button style={styles.mainMenuButton} textStyle={styles.mainMenuButtonText} title="Figure List" onPress={() => navigation.navigate('FigureList')} />
        <Button style={styles.mainMenuButton} textStyle={styles.mainMenuButtonText} title="Figure templates" onPress={() => navigation.navigate('FigureTemplate')} />
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