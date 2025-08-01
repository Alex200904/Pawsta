import React from 'react';
import { MapPin, Heart, Check, X } from 'lucide-react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  showAdoptButton?: boolean;
  onAdopt?: (petId: string) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, showAdoptButton = false, onAdopt }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
          <Heart className="h-5 w-5 text-orange-500" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {pet.size}
          </span>
        </div>
        
        <p className="text-gray-600 mb-2">{pet.breed} • {pet.age} • {pet.gender}</p>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{pet.description}</p>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{pet.location}</span>
        </div>

        {pet.rescueStory && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Rescue Story</h4>
            <p className="text-sm text-blue-800">{pet.rescueStory}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            {pet.vaccinated ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <X className="h-4 w-4 text-red-500 mr-2" />}
            <span className="text-sm">Vaccinated</span>
          </div>
          <div className="flex items-center">
            {pet.neutered ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <X className="h-4 w-4 text-red-500 mr-2" />}
            <span className="text-sm">Neutered</span>
          </div>
          <div className="flex items-center">
            {pet.goodWithKids ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <X className="h-4 w-4 text-red-500 mr-2" />}
            <span className="text-sm">Good with Kids</span>
          </div>
          <div className="flex items-center">
            {pet.goodWithPets ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <X className="h-4 w-4 text-red-500 mr-2" />}
            <span className="text-sm">Good with Pets</span>
          </div>
        </div>
        
        {showAdoptButton && (
          <button
            onClick={() => onAdopt?.(pet.id)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Schedule Meeting
          </button>
        )}
      </div>
    </div>
  );
};

export default PetCard;