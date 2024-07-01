export interface Property {
  id: number;
  name: string;
  category: string;
  operation: string;
  price: number;
  lat: number;
  lon: number;
  display_name: string;
  description: string;
  amenities: string[];
  rooms: number;
  area: number;
  city: string;
  state: string;
  country: string;
  pictures: string[];
  address: string;
  updated_at: Date;
  updated_by: string;
  email: string;
  phone: string;
  promotional?: boolean; // Optional boolean field for promotional listing
}

// Sample data for creativity
const propertyNames = [
  "Tranquil Retreat",
  "Urban Oasis",
  "Elegant Apartment",
  "Cosy Cottage",
  "Modern Loft",
  "Charming House",
  "Luxury Villa",
  "City Center Penthouse",
  "Rural Farmhouse",
  "Studio Apartment",
];

const categories = [
  "office",
  "house",
  "apartment",
  "department", // Assuming this is for "apartment"
  "garage",
];

const amenitiesOptions = [
  ["Swimming Pool", "Garden", "Gym"],
  ["Balcony", "Parking", "Security System"],
  ["En-suite Bathroom", "Walk-in Closet", "Fireplace"],
  ["Open Kitchen", "High Ceilings", "Natural Light"],
  ["Workshop Area", "Storage Shelves", "Electric Door Opener"],
];

const cities = [
  { name: "Lisbon", lat: 38.736946, lon: -9.142685 },
  { name: "Porto", lat: 41.157944, lon: -8.629105 },
  { name: "Faro", lat: 37.017963, lon: -7.930834 },
  { name: "Braga", lat: 41.550323, lon: -8.420052 },
  { name: "Coimbra", lat: 40.203314, lon: -8.410257 },
  { name: "Aveiro", lat: 40.640506, lon: -8.653754 },
  { name: "Évora", lat: 38.57184, lon: -7.90943 },
  { name: "Leiria", lat: 39.74362, lon: -8.80705 },
  { name: "Viseu", lat: 40.66101, lon: -7.90971 },
  { name: "Guarda", lat: 40.53726, lon: -7.26575 },
  { name: "Viana do Castelo", lat: 41.69459, lon: -8.83405 },
  { name: "Setúbal", lat: 38.5244, lon: -8.8882 },
  { name: "Cascais", lat: 38.6979, lon: -9.4223 },
  { name: "Sintra", lat: 38.8009, lon: -9.3782 },
  { name: "Funchal", lat: 32.6668, lon: -16.9241 },
];

const types = ["rent", "buy"];

// Generate an array of 100 creative property listings
const properties: Property[] = [];

// Helper function to get a random element from an array
function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Generate 100 property listings
for (let i = 0; i < 100; i++) {
  const city = getRandomElement(cities);
  const propertyListing: Property = {
    id: i + 1,
    name: getRandomElement(propertyNames),
    category: getRandomElement(categories),
    operation: getRandomElement(types),
    price: getRandomInt(100000, 1000000),
    lat: city.lat + getRandomOffset(),
    lon: city.lon + getRandomOffset(),
    display_name: `${city.name}, Portugal`,
    description: `A unique and vibrant ${getRandomElement(categories)} space designed to inspire creativity and productivity.`,
    amenities: getRandomElement(amenitiesOptions),
    rooms: getRandomInt(1, 10),
    area: getRandomInt(50, 500),
    city: city.name,
    state: city.name, // Assuming the state is the same as the city for simplicity
    country: "Portugal",
    pictures: [
      `https://via.placeholder.com/300/99CCFF/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://via.placeholder.com/300/66CCCC/000000/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://via.placeholder.com/300/CCFFCC/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
    ],
    address: `Street ${getRandomInt(1, 100)}, ${city.name}, Portugal`,
    updated_at: new Date(),
    updated_by: "Admin",
    email: `contact${i + 1}@example.com`,
    phone: `+351 9${Math.floor(Math.random() * 100000000)}`,
  };

  // Randomly assign promotional property listings (60% chance)
  if (Math.random() < 0.6) {
    propertyListing.promotional = true;
  }

  properties.push(propertyListing);
}

// Helper functions for generating random values
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOffset(): number {
  // Larger random offset for latitude and longitude
  return (Math.random() - 0.5) * 0.1;
}

// Output or further usage of properties array
export default properties;
