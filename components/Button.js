import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles.js';

const Button = ({ title, onPress, color = "#D3D3D3", style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }, style]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;