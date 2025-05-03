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
  { name: "San José", lat: 9.9281, lon: -84.0907 },
  { name: "Alajuela", lat: 10.0153, lon: -84.2140 },
  { name: "Cartago", lat: 9.8644, lon: -83.9194 },
  { name: "Heredia", lat: 9.9988, lon: -84.1165 },
  { name: "Liberia", lat: 10.6340, lon: -85.4400 },
  { name: "Puntarenas", lat: 9.9763, lon: -84.8384 },
  { name: "Limon", lat: 9.9907, lon: -83.0360 },
  { name: "Quepos", lat: 9.4312, lon: -84.1619 },
  { name: "Tamarindo", lat: 10.2993, lon: -85.8371 },
  { name: "Jaco", lat: 9.6142, lon: -84.6283 },
  { name: "San Carlos", lat: 10.2705, lon: -84.4444 },
  { name: "Perez Zeledon", lat: 9.3645, lon: -83.7031 },
  { name: "Nicoya", lat: 10.1481, lon: -85.4526 },
  { name: "Santa Cruz", lat: 10.2614, lon: -85.5910 },
  { name: "Turrialba", lat: 9.9052, lon: -83.6838 },
  { name: "Grecia", lat: 10.0732, lon: -84.3100 },
  { name: "Atenas", lat: 9.9791, lon: -84.3806 },
  { name: "Santa Ana", lat: 9.9325, lon: -84.1824 },
  { name: "Escazu", lat: 9.9182, lon: -84.1399 },
];

const types = ["rent", "buy"];

// Generate an array of 100 creative property listings
const properties: Property[] = [];

// Helper function to get a random element from an array
function getRandomElement<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Function to generate random date between two dates
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

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
    display_name: `${city.name}, Costa Rica`,
    description: `A unique and vibrant ${getRandomElement(categories)} space designed to inspire creativity and productivity.`,
    amenities: getRandomElement(amenitiesOptions),
    rooms: getRandomInt(1, 10),
    area: getRandomInt(50, 500),
    city: city.name,
    state: city.name, // Assuming the state is the same as the city for simplicity
    country: "Costa Rica",
    pictures: [
      `https://dummyimage.com/1000x400/99CCFF/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/66CCCC/000000/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/CCFFCC/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/99CCFF/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/66CCCC/000000/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/CCFFCC/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`, 
      `https://dummyimage.com/800x400/99CCFF/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/66CCCC/000000/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/CCFFCC/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/99CCFF/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/66CCCC/000000/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
      `https://dummyimage.com/800x400/CCFFCC/FFFFFF/?text=${getRandomElement(categories).charAt(0).toUpperCase() + getRandomElement(categories).slice(1)}+${i + 1}`,
    ],
    address: `Street ${getRandomInt(1, 100)}, ${city.name}, Costa Rica`,
    updated_at: getRandomDate(new Date(2024, 0, 1), new Date()), // Random date between 2024-01-01 and current date
    updated_by: "Admin",
    email: `contact${i + 1}@example.com`,
    phone: `+506 8${Math.floor(Math.random() * 1000000)}`,
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
