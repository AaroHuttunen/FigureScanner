import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, Alert, ScrollView } from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles.js';
import Button from '../components/Button';

function FigureScreen({ navigation, route }) {
  const { figure } = route.params || {};

  useEffect(() => {
    if (figure) {
      setName(figure.name);
      setStats(figure.stats);
    }
  }, [figure]);
  
  const [name, setName] = useState('Figure Name');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newStat, setNewStat] = useState({ name: '', value: '' });

  // For saving figures.
  async function saveFigure() {
    const figure = { name, stats };
  
    try {
      // Retrieve current figures
      const savedFigures = await AsyncStorage.getItem('figures');
      const figures = savedFigures ? JSON.parse(savedFigures) : [];
  
      // Check if figure already exists (based on unique name, for example)
      const figureExists = figures.some((fig) => fig.name === figure.name);
      if (!figureExists) {
        // Add the new figure and save
        const newFigures = [...figures, figure];
        await AsyncStorage.setItem('figures', JSON.stringify(newFigures));
        Alert.alert("Figure saved.");
      } else {
        // Optional: handle updating or notifying the user that it exists
        Alert.alert("Figure already exists!", "This figure has already been saved.");
      }
    } catch (error) {
      console.error("Failed to save figure", error);
    }
  }
  
  // Initialize stats state as an empty array
  const [stats, setStats] = useState([]);

  const [selectedStatIndex, setSelectedStatIndex] = useState(null);

  const startEditing = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewStat({ ...stats[index] });
  };

  const saveStat = () => {
    setIsEditing(false);
    if (editIndex !== null) {
      editStat(editIndex, newStat);
    } else {
      addStat();
    }
    setNewStat({ name: '', value: '' });
  };

  const editStat = (index, stat) => {
    setStats(prevStats => {
      const newStats = [...prevStats];
      newStats[index] = stat;
      return newStats;
    });
  };

  const addStat = () => {
    const finalName = newStat.name.trim() === '' ? 'James Bond' : newStat.name;
    const finalValue = newStat.value === '' ? '007' : parseInt(newStat.value, 10);
    setStats(prevStats => [...prevStats, { name: finalName, value: finalValue }]);
    setNewStat({ name: '', value: '' });
  };

  const removeStat = (index) => {
    setStats(prevStats => prevStats.filter((_, i) => i !== index));
  };

  async function scanTag() {
    Alert.alert('Waiting for tag.');
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag.ndefMessage) {
        let text = Ndef.text.decodePayload(tag.ndefMessage[0].payload);

        // Convert string back to array of objects
        const data = JSON.parse(text);

        // Update states
        setName(data.name);
        setStats(data.stats);

        Alert.alert('Tag scanned.')
      }
    } catch (ex) {
      Alert.alert('Error', 'Error while scanning: ' + JSON.stringify(ex));
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeTag() {
    try {
      // Prepare data
      const data = {
        name,
        stats,
      };

      // Convert object to string
      const stringifiedData = JSON.stringify(data);

      Alert.alert('Waiting for tag.');

      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      let bytes = Ndef.encodeMessage([
        Ndef.textRecord(stringifiedData),
      ]);

      await NfcManager.ndefHandler.writeNdefMessage(bytes);
    } catch (ex) {
      Alert.alert('Error', 'Error while writing: ' + JSON.stringify(ex));
    } finally {
      Alert.alert('Tag written.')
      NfcManager.cancelTechnologyRequest();
    }
  }

  function incrementStat(index) {
    setStats(prevStats => {
      const newStats = [...prevStats];
      newStats[index].value = Math.min(newStats[index].value + 1, 999);
      return newStats;
    });
  }
  
  function decrementStat(index) {
    setStats(prevStats => {
      const newStats = [...prevStats];
      newStats[index].value = Math.max(newStats[index].value - 1, 0);
      return newStats;
    });
  }

  return (
    <View style={styles.figureScreenContainer}>
      <TextInput style={styles.title} value={name} onChangeText={setName} placeholder="Name" onFocus={() => setSelectedStatIndex(null)}/>
      {isEditing ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={newStat.name}
            onChangeText={text => setNewStat(prevStat => ({ ...prevStat, name: text }))}
            placeholder="Name"
            maxLength={10}
          />
          <TextInput
            style={styles.input}
            value={newStat.value.toString()}
            onChangeText={text => setNewStat(prevStat => ({ ...prevStat, value: parseInt(text, 10) || 0 }))}
            placeholder="Value"
            keyboardType="numeric"
            maxLength={3}
          />
          <View style={styles.buttonGroup}>
            <Button title="Save" onPress={saveStat} />
            {editIndex !== null && <Button title="Delete" onPress={() => { removeStat(editIndex); setIsEditing(false); }} />}
          </View>
        </View>
      ) : (
        <>
          <ScrollView style={styles.body}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => setSelectedStatIndex(index === selectedStatIndex ? null : index)}
                    style={[styles.stat, index === selectedStatIndex ? styles.selectedStatBorder : {}]}
                >
                    <Text style={styles.statText}>{stat.name}</Text>
                    <TextInput 
                        style={styles.input} 
                        value={stat.value.toString()}
                        keyboardType="numeric" 
                        maxLength={3}
                        editable={false}
                    />
                </TouchableOpacity>
            ))}
          </View>
          {selectedStatIndex !== null && !isEditing && (
            <View style={styles.inputButtonsContainer}>
                <View style={styles.buttonRow}>
                  <Button style={styles.inputButton} textStyle={styles.inputButtonText} title="+" onPress={() => incrementStat(selectedStatIndex)} />
                  <Button style={styles.inputButton} textStyle={styles.inputButtonText} title="-" onPress={() => decrementStat(selectedStatIndex)} />
                </View>
              <Button style={styles.inputButton} textStyle={styles.inputButtonText} title="Edit" onPress={() => { startEditing(selectedStatIndex); setSelectedStatIndex(null); }} />
            </View>
          )}
        </ScrollView>
      </>
    )}


      {selectedStatIndex === null && !isEditing &&(
        <View style={styles.buttonGroup}>
          <View style={styles.buttonRow}>
            <Button style={styles.scanButton} textStyle={styles.scanButtonText} title="Scan tag" onPress={scanTag} />
            <Button style={styles.scanButton} textStyle={styles.scanButtonText} title="Write tag" onPress={writeTag} />
          </View>
          <View style={styles.buttonRow}>
            <Button style={styles.scanButton} textStyle={styles.scanButtonText} title="Add new stat" onPress={() => { setIsEditing(true); setEditIndex(null); }} />
            <Button style={styles.scanButton} textStyle={styles.scanButtonText} title="Save Figure" onPress={saveFigure} />
          </View>
        </View>
      )}

      {!isEditing && (
        <View style={styles.navbar}>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
          <Button title="Figurelist" onPress={() => navigation.navigate('FigureList')} />
          <Button title="Figure templates" onPress={() => navigation.navigate('FigureTemplate')} />
        </View>
      )}
    </View>
  );
}

export default FigureScreen;