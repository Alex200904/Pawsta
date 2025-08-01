import React from 'react';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  openHours: string;
  rating: number;
  emergency?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  address,
  phone,
  email,
  services,
  openHours,
  rating,
  emergency = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {emergency && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            24/7 Emergency
          </span>
        )}
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{phone}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{email}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{openHours}</span>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <Star className="h-4 w-4 text-yellow-400 mr-1" />
        <span className="text-sm font-medium">{rating}</span>
        <span className="text-sm text-gray-500 ml-1">rating</span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        Contact Now
      </button>
    </div>
  );
};

export default ServiceCard;