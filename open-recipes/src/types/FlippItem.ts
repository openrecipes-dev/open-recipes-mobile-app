export interface FlippItem {
  id: string;
  name: string;
  current_price: number;
  clipping_image_url: string;
  merchant_logo: string;
  merchant_name: string;
}

export interface FlippResponse {
  items: FlippItem[];
  facets: any;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}