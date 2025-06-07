import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import unitsData from './data/units';
import { convertUnit } from './utils/converter';
import { UnitsData, Unit, TemperatureUnit } from './types/units';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<keyof UnitsData>('length');
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [convertedResult, setConvertedResult] = useState<string>('');

  // Set default units when category changes or component mounts
  useEffect(() => {
    const currentCategoryUnits = unitsData[selectedCategory];
    if (currentCategoryUnits && currentCategoryUnits.length > 0) {
      setFromUnit(currentCategoryUnits[0].name);
      if (currentCategoryUnits.length > 1) {
        setToUnit(currentCategoryUnits[1].name);
      } else {
        setToUnit(currentCategoryUnits[0].name);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    handleConversion();
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const handleConversion = () => {
    if (inputValue === '' || fromUnit === '' || toUnit === '') {
      setConvertedResult('');
      return;
    }
    const result = convertUnit(selectedCategory, inputValue, fromUnit, toUnit);
    setConvertedResult(result);
  };

  const getUnitOptions = (category: keyof UnitsData) => {
    const units = unitsData[category];
    // Check if units is an array of Unit or TemperatureUnit and map accordingly
    if (category === 'temperature') {
        return (units as TemperatureUnit[]).map((unit) => ({ label: unit.name, value: unit.name }));
    } else {
        return (units as Unit[]).map((unit) => ({ label: unit.name, value: unit.name }));
    }
  };

  const categories = Object.keys(unitsData) as (keyof UnitsData)[]; // Type assertion for categories

  // Helper to get symbol for display
  const getSymbolForUnit = (unitName: string): string => {
    const categoryUnits = unitsData[selectedCategory];
    if (categoryUnits) {
        const foundUnit = categoryUnits.find(unit => unit.name === unitName);
        return foundUnit ? foundUnit.symbol : '';
    }
    return '';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Unit Converter</Text>

      {/* Category Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.categoryButtons}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText,
                ]}
              >
                {String(category).charAt(0).toUpperCase() + String(category).slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Enter Value:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="e.g., 100"
        />
      </View>

      {/* From Unit Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Convert From:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={fromUnit}
            onValueChange={(itemValue: string) => setFromUnit(itemValue)} // Explicitly type itemValue
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {getUnitOptions(selectedCategory).map((unit) => (
              <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* To Unit Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Convert To:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={toUnit}
            onValueChange={(itemValue: string) => setToUnit(itemValue)} // Explicitly type itemValue
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {getUnitOptions(selectedCategory).map((unit) => (
              <Picker.Item key={unit.value} label={unit.label} value={unit.value} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Result Display */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result:</Text>
        <Text style={styles.resultText}>
          {convertedResult ? `${convertedResult} ${getSymbolForUnit(toUnit)}` : 'Enter value and select units'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 20,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e6ffe6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a0e0a0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#28a745',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    margin: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
});