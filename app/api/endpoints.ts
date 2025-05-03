import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from ".";
import properties, { Property } from "~/constants/mockData";

export async function postData({
  formData,
  signal,
}: {
  formData: any;
  signal: AbortSignal;
}) {
  try {
    const response = await api.post("/posts", formData, { signal });
    return response;
  } catch (e: any) {
    throw new Error("Error, try again later");
  }
}

export async function searchLocation({
  params,
  signal,
}: {
  params: { q: string; size: string };
  signal: AbortSignal;
}) {
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?&class=place&countrycodes=cr&format=jsonv2&${params}`,
      { signal }
    );
    return data ?? [];
  } catch (e: any) {
    throw new Error("Error, try again later");
  }
}

// Haversine Formula Function
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 1; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180); // deg2rad
  const dLon = (lon2 - lon1) * (Math.PI / 180); // deg2rad
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Function to check if the point is within 5 kilometers radius
const isWithinRadius = (centerLat: number, centerLon: number, pointLat: number, pointLon: number, radius: number): boolean => {
  const distance = getDistanceFromLatLonInKm(centerLat, centerLon, pointLat, pointLon);
  return distance <= radius;
}

const sortProperties = (properties: Property[], sortBy: string): Property[] => {
  switch (sortBy) {
    case "price-asc":
      return properties.sort((a, b) => a.price - b.price);
    case "relevant":
      // Implement your relevance criteria sorting here, if applicable
      return properties; // Example: return properties.sort(...);
    case "newest":
      return properties.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    case "smallest":
      return properties.sort((a, b) => a.area - b.area);
    case "biggest":
      return properties.sort((a, b) => b.area - a.area);
    default:
      return properties; // Default to returning unsorted properties
  }
};

// Interface for filter criteria
export interface FilterCriteria {
  category?: string;
  operation?: string;
  price_from?: number;
  price_to?: number;
  rooms?: number;
  area_from?: number;
  area_to?: number;
  city?: string;
  promotional?: boolean;
  lat?: number;
  lng?: number;
  page?: number;
  size?: number;
  radius?: number; // Radius in kilometers for proximity filtering
  amenities?: string[];
  sort?: string;
}

// Mock Axios instance
const fakeAxios = {
  get: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Property | Property[]>> => {
    if (url.includes('/properties')) {
      const urlParts = url.split('/');
      const propertyId = urlParts[urlParts.length - 1];
      
      // Handling single property request by ID
      if (propertyId !== 'properties' && propertyId !== 'filter') {
        const property = properties.find(prop => prop.id === parseFloat(propertyId));
        if (property) {
          return {
            data: property,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          };
        } else {
          return {
            data: {} as Property,
            status: 404,
            statusText: 'Not Found',
            headers: {},
            config: {},
          };
        }
      } else {
        // Handling filtered list of properties
        const params = new URLSearchParams(config?.params as string);
        const criteria: FilterCriteria = {
          category: params.get('category') || undefined,
          operation: params.get('operation') || undefined,
          price_from: params.get('price_from') ? parseFloat(params.get('price_from')!) : undefined,
          price_to: params.get('price_to') ? parseFloat(params.get('price_to')!) : undefined,
          area_from: params.get('area_from') ? parseFloat(params.get('area_from')!) : undefined,
          area_to: params.get('area_to') ? parseFloat(params.get('area_to')!) : undefined,
          rooms: params.get('rooms') ? parseInt(params.get('rooms')!) : undefined,
          city: params.get('city') || undefined,
          promotional: params.get('promotional') ? params.get('promotional') === 'true' : undefined,
          lat: params.get('lat') ? parseFloat(params.get('lat')!) : undefined,
          lng: params.get('lng') ? parseFloat(params.get('lng')!) : undefined,
          radius: params.get('radius') ? parseFloat(params.get('radius')!) : undefined,
          amenities: params.get('amenities') ? params.get('amenities')!.split(',') : undefined,
          sort: params.get('sort') || undefined,
          page: params.get('page') ? parseFloat(params.get('page')!) : 1,
          size: params.get('size') ? parseFloat(params.get('size')!) : 10, // Default size of 10 if not provided
        };

        let filteredProperties = properties.filter(property => {
          // Apply filtering based on criteria
          if (criteria.category && property.category !== criteria.category) {
            return false;
          }
          if (criteria.operation && property.operation !== criteria.operation) {
            return false;
          }
          if (criteria.area_from !== undefined && property.area < criteria.area_from) {
            return false;
          }
          if (criteria.area_to !== undefined && property.price > criteria.area_to) {
            return false;
          }
          if (criteria.price_from !== undefined && property.price < criteria.price_from) {
            return false;
          }
          if (criteria.price_to !== undefined && property.price > criteria.price_to) {
            return false;
          }
          if (criteria.rooms !== undefined && property.rooms >= criteria.rooms) {
            return false;
          }
          if (criteria.city && property.city !== criteria.city) {
            return false;
          }
          if (criteria.promotional !== undefined && property.promotional !== criteria.promotional) {
            return false;
          }
       
          if (criteria.lat !== undefined && criteria.lng !== undefined && criteria.radius !== undefined) {
            const correctRadius = isWithinRadius(criteria.lat, criteria.lng, property.lat, property.lng, criteria.radius);
            if (!correctRadius) {
              return false;
            }
          }
          if (criteria.amenities && !criteria.amenities.every(amenity => property.amenities.includes(amenity))) {
            return false;
          }
          return true;
        });

        // Apply sorting if specified
        if (criteria.sort) {
          filteredProperties = sortProperties(filteredProperties, criteria.sort);
        }

        const totalResults = filteredProperties.length; // Total results before pagination


        // Pagination logic
        const startIndex = (criteria.page - 1) * criteria.size;
        const endIndex = startIndex + criteria.size;
        filteredProperties = filteredProperties.slice(startIndex, endIndex);

        // Prepare response object with pagination info
        const totalPages = Math.ceil(totalResults / criteria.size); // Total pages
        const responseObj = {
          page: criteria.page,
          size: criteria.size,
          total: totalResults,
          results: filteredProperties,
        };

        return {
          data: responseObj,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        };
      }
    }

    // Default case if the URL does not match known patterns
    return {
      data: {} as Property,
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: {},
    };
  }
};

export async function getSearchResults({
  params,
  signal,
}: {
  params: URLSearchParams;
  signal: AbortSignal;
}) {
  try {
    const { data } = await fakeAxios.get('/properties', { params: params.toString(), signal });
    return data ?? [];
  } catch (e: any) {
    throw new Error("Error, try again later");
  }
}

export async function getProductById({
  id,
  signal,
}: {
  id: string;
  signal: AbortSignal;
}) {
  try {
    const { data } = await fakeAxios.get(`/properties/${id}`, { signal });
     return data ?? {};
  } catch (e: any) {
    throw new Error("Error, try again later");
  }
}
