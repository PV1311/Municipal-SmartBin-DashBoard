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
  status: 'operational' | 'maintenance' | 'offline'|'string';
  type: 'general' | 'recyclable' | 'organic';
  capacity: number;
  lastCollected: string;
}

// export interface SmartBin {
//   id: string;
//   location: {
//     lat: number;
//     lng: number;
//     address: string;
//     area: string;
//   };
//   type: string;
//   fillLevel: number;
//   status: string;
//   lastUpdated: string;
//   lastCollected: string;
// }

export interface RecycleCenter {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}
