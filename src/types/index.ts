export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  description: string;
  image: string;
  location: string;
  rescueStory?: string;
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
}

export interface VaccinationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  openHours: string;
  rating: number;
}

export interface VetHospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  emergency: boolean;
  openHours: string;
  rating: number;
}

export interface Consultation {
  id: string;
  petName: string;
  ownerName: string;
  problem: string;
  solution: string;
  timestamp: Date;
}