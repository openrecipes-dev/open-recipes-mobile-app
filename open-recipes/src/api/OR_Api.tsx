import { FlippResponse, UserLocation } from '../types/OR_Item';

const BASE_URL = 'http://localhost:8080/search/ingredients/all';

export const searchFlippItems = async (query: string, location: UserLocation | null): Promise<FlippResponse> => {
  const postalCode = location ? await getPostalCodeFromLocation(location) : '98225';
  const url = `${BASE_URL}?searchText=${query}&postalCode=${postalCode}`;
  
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