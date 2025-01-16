export interface SmartBin {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    area: string;
  };
  fillLevel: number;
  lastUpdated: string;
  status: 'operational' | 'maintenance' | 'offline';
  type: 'general' | 'recyclable' | 'organic';
  capacity: number;
}