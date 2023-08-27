import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './Styles.js';

function CustomButton({ title, onPress, color = "#D3D3D3" }) {
  return (
    <TouchableOpacity style={[styles.figureScreenButton, {backgroundColor: color}]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function FigureTemplateScreen({ navigation }) {
  return (
    <View style={styles.figureScreenContainer}>
      <View style={styles.developmentMessageContainer}>
        <Text style={styles.developmentMessageText}>Feature still in development.</Text>
      </View>
      <View style={styles.navbar}>
        <CustomButton title="Home" onPress={() => navigation.navigate('Home')} />
        <CustomButton title="Scan Figure" onPress={() => navigation.navigate('ScanFigure')} />
        <CustomButton title="Figurelist" onPress={() => navigation.navigate('FigureList')} />
      </View>
    </View>
  );
}

export default FigureTemplateScreen;