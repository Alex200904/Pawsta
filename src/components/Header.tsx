import React from 'react';
import { Heart, MapPin, Stethoscope, Syringe, PawPrint } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: PawPrint },
    { id: 'rescued', label: 'Rescued Pets', icon: Heart },
    { id: 'adoption', label: 'Available Pets', icon: Heart },
    { id: 'vaccination', label: 'Vaccination Centers', icon: Syringe },
    { id: 'hospitals', label: 'Vet Hospitals', icon: MapPin },
    { id: 'doctor', label: 'My Doctor', icon: Stethoscope }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <PawPrint className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Pawsta</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
            >
              {navItems.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;