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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryButtons}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              activeOpacity={0.8}
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
        </ScrollView>
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

      {/* Convert Button */}
      <View style={styles.convertButtonContainer}>
        <TouchableOpacity
          style={styles.convertButton}
          activeOpacity={0.85}
          onPress={handleConversion}
        >
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>
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
    backgroundColor: 'linear-gradient(180deg, #e0eafc 0%, #cfdef3 100%)', // fallback for RN: use backgroundColor
    backgroundColor: '#e0eafc',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    minHeight: '100%',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 36,
    textAlign: 'center',
    color: '#1a237e',
    letterSpacing: 1.2,
    textShadowColor: '#b3c6ff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  section: {
    marginBottom: 28,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e3e8f0',
  },
  label: {
    fontSize: 20,
    marginBottom: 12,
    color: '#3949ab',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  input: {
    height: 56,
    borderColor: '#b3c6ff',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 18,
    fontSize: 22,
    backgroundColor: '#f4f8fb',
    color: '#222',
    fontWeight: '600',
    shadowColor: '#b3c6ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  pickerContainer: {
    borderColor: '#b3c6ff',
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f4f8fb',
    marginBottom: 2,
    shadowColor: '#b3c6ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  picker: {
    height: 56,
    width: '100%',
  },
  pickerItem: {
    fontSize: 20,
    color: '#222',
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 36,
    padding: 28,
    backgroundColor: '#e3ffe6',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#a0e0a0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a0e0a0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  resultLabel: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#388e3c',
    letterSpacing: 0.5,
  },
  resultText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
    letterSpacing: 1.2,
    textShadowColor: '#b3c6ff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    backgroundColor: '#f4f8fb',
    marginHorizontal: 4,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: '#b3c6ff',
    shadowColor: '#b3c6ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
    shadowColor: '#1976d2',
    elevation: 4,
  },
  categoryButtonText: {
    color: '#3949ab',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  selectedCategoryButtonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  convertButtonContainer: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  convertButton: {
    width: '80%',
    paddingVertical: 18,
    borderRadius: 32,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});