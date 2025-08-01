import React from 'react';
import { Heart, Shield, MapPin, Stethoscope } from 'lucide-react';

interface HeroProps {
  onSectionChange: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const features = [
    {
      icon: Heart,
      title: 'Pet Adoption',
      description: 'Find your perfect companion from rescued pets',
      action: () => onSectionChange('adoption'),
      color: 'text-red-500 bg-red-50'
    },
    {
      icon: Shield,
      title: 'Free Vaccination',
      description: 'Locate free vaccination centers near you',
      action: () => onSectionChange('vaccination'),
      color: 'text-green-500 bg-green-50'
    },
    {
      icon: MapPin,
      title: 'Vet Hospitals',
      description: 'Find the best veterinary care facilities',
      action: () => onSectionChange('hospitals'),
      color: 'text-blue-500 bg-blue-50'
    },
    {
      icon: Stethoscope,
      title: 'My Doctor',
      description: 'Get instant solutions for pet health issues',
      action: () => onSectionChange('doctor'),
      color: 'text-purple-500 bg-purple-50'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-500">Pawsta</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your comprehensive platform for pet adoption, healthcare, and veterinary services. 
            Find your perfect companion and keep them healthy with our trusted network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onSectionChange('adoption')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Adopt a Pet
            </button>
            <button
              onClick={() => onSectionChange('doctor')}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Consult AI Doctor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              <div className={`rounded-full p-4 w-16 h-16 mx-auto mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
            <div className="text-gray-600">Pets Rescued</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
            <div className="text-gray-600">Vaccination Centers</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-gray-600">AI Doctor Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;