import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles.js';
import Button from '../components/Button';

const FigureListScreen = ({ navigation }) => {
  const [figures, setFigures] = useState([]);

  // Load figures from AsyncStorage when the component mounts
  useEffect(() => {
    loadFigures();
  }, []);

  const loadFigures = async () => {
    try {
      const savedFigures = await AsyncStorage.getItem('figures');
      if (savedFigures !== null) {
        setFigures(JSON.parse(savedFigures));
      }
    } catch (error) {
      console.error("Failed to load figures", error);
    }
  };

  const handleFigurePress = (figure) => {
    navigation.navigate('ScanFigure', { figure });
  };

  const clearStorage = async () => {
    try {
      // Retrieve current figures from AsyncStorage
      const savedFigures = await AsyncStorage.getItem('figures');
      if (savedFigures) {
        await AsyncStorage.setItem('figures', JSON.stringify([])); // Reset to an empty array
        setFigures([]); // Update state to reflect changes in UI
      }
    } catch (error) {
      console.error("Failed to clear storage", error);
    }
  };

  const deleteFigure = async (figureName) => {
    try {
      // Retrieve the current list of saved figures
      const savedFigures = await AsyncStorage.getItem('figures');
      const figures = savedFigures ? JSON.parse(savedFigures) : [];
  
      // Filter out the selected figure
      const updatedFigures = figures.filter(fig => fig.name !== figureName);
  
      // Save the updated figures list back to storage
      await AsyncStorage.setItem('figures', JSON.stringify(updatedFigures));
  
      // Update the UI to reflect the change
      setFigures(updatedFigures);
    } catch (error) {
      console.error("Failed to delete figure", error);
    }
  };

  const confirmDelete = (figureName) => {
    Alert.alert(
      "Delete Figure",
      `Are you sure you want to delete ${figureName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteFigure(figureName), style: "destructive" }
      ]
    );
  };
  

  return (
    <View style={styles.figureScreenContainer}>
      <ScrollView style={styles.body}>
        {figures.map((figure, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.figureListItem} 
            onPress={() => handleFigurePress(figure)}
            onLongPress={() => confirmDelete(figure.name)}
          >
            <Text style={styles.figureListItemText}>{figure.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title="Clear All Figures" onPress={clearStorage} color="#e74c3c" />
      <View style={styles.navbar}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Scan Figure" onPress={() => navigation.navigate('ScanFigure')} />
        <Button title="Figure templates" onPress={() => navigation.navigate('FigureTemplate')} />
      </View>
    </View>
  );
}

export default FigureListScreen;