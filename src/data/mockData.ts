import { Pet, VaccinationCenter, VetHospital } from '../types';

export const rescuedPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever Mix',
    age: '3 years',
    gender: 'Male',
    size: 'Large',
    description: 'Friendly and energetic dog who loves playing fetch and swimming.',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'New York, NY',
    rescueStory: 'Found abandoned in a park, now fully recovered and ready for a loving home.',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Tabby Cat',
    age: '2 years',
    gender: 'Female',
    size: 'Small',
    description: 'Gentle and affectionate cat who loves cuddles and sunbathing.',
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Los Angeles, CA',
    rescueStory: 'Rescued from a overcrowded shelter, looking for a quiet loving home.',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: false
  },
  {
    id: '3',
    name: 'Max',
    breed: 'German Shepherd',
    age: '5 years',
    gender: 'Male',
    size: 'Large',
    description: 'Loyal and intelligent dog, great for active families.',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Chicago, IL',
    rescueStory: 'Former police dog looking for retirement with a loving family.',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true
  }
];

export const availablePets: Pet[] = [
  {
    id: '4',
    name: 'Bella',
    breed: 'Labrador Mix',
    age: '1 year',
    gender: 'Female',
    size: 'Medium',
    description: 'Puppy with lots of energy, perfect for an active family.',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Miami, FL',
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true
  },
  {
    id: '5',
    name: 'Oscar',
    breed: 'Persian Cat',
    age: '4 years',
    gender: 'Male',
    size: 'Medium',
    description: 'Calm and dignified cat who enjoys quiet environments.',
    image: 'https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Seattle, WA',
    vaccinated: true,
    neutered: true,
    goodWithKids: false,
    goodWithPets: false
  }
];

export const vaccinationCenters: VaccinationCenter[] = [
  {
    id: '1',
    name: 'City Pet Vaccination Center',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    email: 'info@citypetvac.com',
    services: ['Basic Vaccinations', 'Rabies Shots', 'Health Checkups', 'Microchipping'],
    openHours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-4PM',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Community Animal Health Center',
    address: '456 Oak Ave, Suburb',
    phone: '(555) 987-6543',
    email: 'care@communityvet.org',
    services: ['Free Vaccinations', 'Spay/Neuter', 'Emergency Care', 'Dental Care'],
    openHours: 'Mon-Sun: 8AM-8PM',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Mobile Vaccination Unit',
    address: 'Various Locations - Call for Schedule',
    phone: '(555) 246-8135',
    email: 'mobile@petcare.com',
    services: ['Mobile Vaccinations', 'At-Home Service', 'Senior Pet Care'],
    openHours: 'By Appointment Only',
    rating: 4.7
  }
];

export const vetHospitals: VetHospital[] = [
  {
    id: '1',
    name: 'Emergency Pet Hospital',
    address: '789 Emergency Blvd, Medical District',
    phone: '(555) 911-PETS',
    email: 'emergency@pethospital.com',
    specialties: ['Emergency Medicine', 'Surgery', 'Critical Care', 'Trauma'],
    emergency: true,
    openHours: '24/7 Emergency Service',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Compassionate Care Veterinary',
    address: '321 Caring Way, Westside',
    phone: '(555) care-pet',
    email: 'info@compassionatecare.vet',
    specialties: ['General Practice', 'Wellness Exams', 'Vaccinations', 'Behavioral'],
    emergency: false,
    openHours: 'Mon-Fri: 7AM-7PM, Weekends: 8AM-5PM',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Specialized Animal Medical Center',
    address: '654 Specialist Dr, University Area',
    phone: '(555) special-vet',
    email: 'specialists@animalmed.com',
    specialties: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology'],
    emergency: false,
    openHours: 'Mon-Fri: 8AM-6PM',
    rating: 4.9
  }
];