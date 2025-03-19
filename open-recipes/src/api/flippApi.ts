import { FlippResponse, UserLocation } from '../types/FlippItem';

const BASE_URL = 'https://backflipp.wishabi.com/flipp/items/search';

export const searchFlippItems = async (query: string, location: UserLocation | null): Promise<FlippResponse> => {
  const postalCode = location ? await getPostalCodeFromLocation(location) : '98225';
  const url = `${BASE_URL}?locale=English&postal_code=${postalCode}&q=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  
  return response.json();
};

const getPostalCodeFromLocation = async (location: UserLocation): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
    );
    const data = await response.json();
    return data.address.postcode || '98225';
  } catch (error) {
    console.error('Error getting postal code:', error);
    return '98225';
  }
}; 