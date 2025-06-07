import unitsData from '../data/units';
import { Unit, TemperatureUnit, UnitsData } from '../types/units';

export const convertUnit = (
  category: keyof UnitsData, // Ensures category is one of the keys in UnitsData
  value: string,
  fromUnitName: string,
  toUnitName: string
): string => {
  if (value === '' || isNaN(Number(value))) {
    return '';
  }

  const numericValue = Number(value);

  // Handle temperature conversions separately
  if (category === 'temperature') {
    return convertTemperature(
      numericValue,
      fromUnitName,
      toUnitName
    );
  }

  const categoryUnits = unitsData[category] as Unit[]; // Type assertion for non-temperature units
  if (!categoryUnits) {
    return 'Invalid category';
  }

  const fromUnit = categoryUnits.find(unit => unit.name === fromUnitName);
  const toUnit = categoryUnits.find(unit => unit.name === toUnitName);

  if (!fromUnit || !toUnit) {
    return 'Invalid unit';
  }

  // Convert 'from' unit to base unit
  const valueInBase = numericValue * fromUnit.base;

  // Convert base unit to 'to' unit
  const convertedValue = valueInBase / toUnit.base;

  return convertedValue.toFixed(4); // Round to 4 decimal places
};

const convertTemperature = (
  value: number,
  fromUnit: string,
  toUnit: string
): string => {
  let celsius: number;

  // Convert to Celsius first
  if (fromUnit === 'Celsius') {
    celsius = value;
  } else if (fromUnit === 'Fahrenheit') {
    celsius = (value - 32) * 5 / 9;
  } else if (fromUnit === 'Kelvin') {
    celsius = value - 273.15;
  } else {
    return 'Invalid temperature unit';
  }

  // Convert from Celsius to target unit
  if (toUnit === 'Celsius') {
    return celsius.toFixed(2);
  } else if (toUnit === 'Fahrenheit') {
    return ((celsius * 9 / 5) + 32).toFixed(2);
  } else if (toUnit === 'Kelvin') {
    return (celsius + 273.15).toFixed(2);
  } else {
    return 'Invalid temperature unit';
  }
};