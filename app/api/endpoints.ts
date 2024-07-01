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
      `https://nominatim.openstreetmap.org/search?&countrycodes=pt&format=jsonv2&accept-language=es%2C%20en&${params}`,
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
  radius?: number; // Radius in kilometers for proximity filtering
  amenities?: string[];
}

const fakeAxios = {
  get: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Property | Property[]>> => {
    if (url.includes('/properties')) {
      const urlParts = url.split('/');
      const propertyId = urlParts[urlParts.length - 1];
      console.log(propertyId, 'vwcv')
      console.log(propertyId, 'vwcv')
      console.log(propertyId, 'vwcv')
      console.log(propertyId, 'vwcv')
      console.log(propertyId, 'vwcv')
      console.log(propertyId, 'vwcv')
      if (propertyId !== 'properties' && propertyId !== 'filter') {
        const property = properties.find(prop => prop.id === parseFloat(propertyId));
        console.log(property, 'p')
        console.log(property, 'p')
        console.log(property, 'p')
        console.log(property, 'p')
        console.log(property, 'p')
        console.log(property, 'p')
        console.log(property, 'p')
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
        };

        const filteredProperties = properties.filter(property => {
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

        return {
          data: filteredProperties,
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
