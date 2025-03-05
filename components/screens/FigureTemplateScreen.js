import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles.js';
import Button from '../components/Button.js';

function FigureTemplateScreen({ navigation }) {
  return (
    <View style={styles.figureScreenContainer}>
      <View style={styles.developmentMessageContainer}>
        <Text style={styles.developmentMessageText}>Feature still in development.</Text>
      </View>
      <View style={styles.navbar}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Scan Figure" onPress={() => navigation.navigate('ScanFigure')} />
        <Button title="Figurelist" onPress={() => navigation.navigate('FigureList')} />
      </View>
    </View>
  );
}

export default FigureTemplateScreen;