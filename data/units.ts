import { UnitsData } from '../types/units';

const unitsData: UnitsData = {
  length: [
    { name: 'Meters', symbol: 'm', base: 1 },
    { name: 'Kilometers', symbol: 'km', base: 1000 },
    { name: 'Centimeters', symbol: 'cm', base: 0.01 },
    { name: 'Millimeters', symbol: 'mm', base: 0.001 },
    { name: 'Miles', symbol: 'mi', base: 1609.34 },
    { name: 'Yards', symbol: 'yd', base: 0.9144 },
    { name: 'Feet', symbol: 'ft', base: 0.3048 },
    { name: 'Inches', symbol: 'in', base: 0.0254 },
  ],
  weight: [
    { name: 'Kilograms', symbol: 'kg', base: 1 },
    { name: 'Grams', symbol: 'g', base: 0.001 },
    { name: 'Milligrams', symbol: 'mg', base: 0.000001 },
    { name: 'Pounds', symbol: 'lb', base: 0.453592 },
    { name: 'Ounces', symbol: 'oz', base: 0.0283495 },
  ],
  temperature: [
    { name: 'Celsius', symbol: '°C' },
    { name: 'Fahrenheit', symbol: '°F' },
    { name: 'Kelvin', symbol: 'K' },
  ],
  // Add more categories here
};

export default unitsData;