import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Alert, ScrollView } from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styles from './Styles.js';

function CustomButton({ title, onPress, color = "#D3D3D3" }) {
  return (
    <TouchableOpacity style={[styles.figureScreenButton, {backgroundColor: color}]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function ScanButton({ title, onPress, color = "#D3D3D3" }) {
  return (
    <TouchableOpacity style={[styles.scanButton, {backgroundColor: color}]} onPress={onPress}>
      <Text style={styles.scanButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function InputButton({ title, onPress, color = "#D3D3D3" }) {
  return (
    <TouchableOpacity style={[styles.inputButton, {backgroundColor: color}]} onPress={onPress}>
      <Text style={styles.inputButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function FigureScreen({ navigation }) {
  const [name, setName] = useState('Figure Name');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newStat, setNewStat] = useState({ name: '', value: '' });
  
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
            <CustomButton title="Save" onPress={saveStat} />
            {editIndex !== null && <CustomButton title="Delete" onPress={() => { removeStat(editIndex); setIsEditing(false); }} />}
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
              <View style={styles.inputButtons}>
                <InputButton title="+" onPress={() => incrementStat(selectedStatIndex)} />
                <InputButton title="-" onPress={() => decrementStat(selectedStatIndex)} />
                <InputButton title="Edit" onPress={() => { startEditing(selectedStatIndex); setSelectedStatIndex(null); }} />
              </View>
            </View>
          )}
        </ScrollView>
      </>
    )}


      {selectedStatIndex === null && !isEditing &&(
        <View style={styles.buttonGroup}>
          <ScanButton title="Scan tag" onPress={scanTag} />
          <ScanButton title="Write tag" onPress={writeTag} />
          <ScanButton title="Add new stat" onPress={() => { setIsEditing(true); setEditIndex(null); }} />
        </View>
      )}

      {!isEditing && (
        <View style={styles.navbar}>
          <CustomButton title="Home" onPress={() => navigation.navigate('Home')} />
          <CustomButton title="Figurelist" onPress={() => navigation.navigate('FigureList')} />
          <CustomButton title="Figure templates" onPress={() => navigation.navigate('FigureTemplate')} />
        </View>
      )}
    </View>
  );
}

export default FigureScreen;