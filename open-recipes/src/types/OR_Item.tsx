export interface FlippItem {
    id: string;
    name: string;
    current_price: number;
    clean_image_url: string;
    merchant_logo: string;
    merchant_name: string;
    sale_story: string;
  }
  
  export type FlippResponse = FlippItem[];

  
  export interface UserLocation {
    latitude: number;
    longitude: number;
  }