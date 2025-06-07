export interface Unit {
  name: string;
  symbol: string;
  base: number; // The conversion factor to the base unit (e.g., meters for length)
}

// For temperature, base is not applicable in the same way, so we can have a separate type or allow 'base' to be optional.
// For simplicity, let's keep it optional for now, knowing temperature needs special handling.
export interface TemperatureUnit {
  name: string;
  symbol: string;
}

export interface UnitsData {
  length: Unit[];
  weight: Unit[];
  temperature: TemperatureUnit[];
  // Add more categories as needed
  [key: string]: Unit[] | TemperatureUnit[]; // Index signature for dynamic access
}