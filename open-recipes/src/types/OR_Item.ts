export interface OpenRecipeServiceItem {
    id: string;
    name: string;
    current_price: number;
    clean_image_url: string;
    merchant_logo: string;
    merchant_name: string;
    sale_story: string;
  }
  
  export type ORResponse = OR_Item[];

  
  export interface UserLocation {
    latitude: number;
    longitude: number;
  }