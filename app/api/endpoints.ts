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
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

const sortProperties = (properties: Property[], sortBy: string): Property[] => {
  switch (sortBy) {
    case "price-asc":
      return properties.sort((a, b) => a.price - b.price);
    case "relevant":
      // Implement your relevance criteria sorting here, if applicable
      return properties; // Example: return properties.sort(...);
    case "newest":
      return properties.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
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
  min_price?: number;
  max_price?: number;
  min_rooms?: number;
  max_rooms?: number;
  city?: string;
  promotional?: boolean;
  lat?: number;
  lon?: number;
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
          min_price: params.get('min_price') ? parseFloat(params.get('min_price')!) : undefined,
          max_price: params.get('max_price') ? parseFloat(params.get('max_price')!) : undefined,
          min_rooms: params.get('min_rooms') ? parseInt(params.get('min_rooms')!) : undefined,
          max_rooms: params.get('max_rooms') ? parseInt(params.get('max_rooms')!) : undefined,
          city: params.get('city') || undefined,
          promotional: params.get('promotional') ? params.get('promotional') === 'true' : undefined,
          lat: params.get('lat') ? parseFloat(params.get('lat')!) : undefined,
          lon: params.get('lon') ? parseFloat(params.get('lon')!) : undefined,
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
          if (criteria.min_price !== undefined && property.price < criteria.min_price) {
            return false;
          }
          if (criteria.max_price !== undefined && property.price > criteria.max_price) {
            return false;
          }
          if (criteria.min_rooms !== undefined && property.rooms < criteria.min_rooms) {
            return false;
          }
          if (criteria.max_rooms !== undefined && property.rooms > criteria.max_rooms) {
            return false;
          }
          if (criteria.city && property.city !== criteria.city) {
            return false;
          }
          if (criteria.promotional !== undefined && property.promotional !== criteria.promotional) {
            return false;
          }
          if (criteria.lat !== undefined && criteria.lon !== undefined && criteria.radius !== undefined) {
            const distance = haversineDistance(criteria.lat, criteria.lon, property.lat, property.lon);
            if (distance > criteria.radius) {
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
