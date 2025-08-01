import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PetCard from './components/PetCard';
import ServiceCard from './components/ServiceCard';
import MyDoctor from './components/MyDoctor';
import { rescuedPets, availablePets, vaccinationCenters, vetHospitals } from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleAdopt = (petId: string) => {
    const pet = availablePets.find(p => p.id === petId);
    if (pet) {
      alert(`Thank you for your interest in ${pet.name}! We'll contact you soon to schedule a meeting.`);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onSectionChange={setActiveSection} />;
      
      case 'rescued':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Rescued Pets Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet our brave survivors who found their second chance at happiness. 
                Each pet has a unique rescue story and is now looking for their forever home.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rescuedPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>
        );
      
      case 'adoption':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Available for Adoption</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These wonderful pets are ready to meet their new families. 
                Click "Schedule Meeting" to arrange a visit and start your adoption journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availablePets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  showAdoptButton={true}
                  onAdopt={handleAdopt}
                />
              ))}
            </div>
          </div>
        );
      
      case 'vaccination':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Vaccination Centers</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Keep your pets healthy with our network of free vaccination centers. 
                All centers offer quality care at no cost to ensure every pet stays protected.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vaccinationCenters.map((center) => (
                <ServiceCard
                  key={center.id}
                  title={center.name}
                  address={center.address}
                  phone={center.phone}
                  email={center.email}
                  services={center.services}
                  openHours={center.openHours}
                  rating={center.rating}
                />
              ))}
            </div>
          </div>
        );
      
      case 'hospitals':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Veterinary Hospitals</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find the best veterinary care for your pets. Our network includes 
                emergency hospitals and specialized care facilities.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vetHospitals.map((hospital) => (
                <ServiceCard
                  key={hospital.id}
                  title={hospital.name}
                  address={hospital.address}
                  phone={hospital.phone}
                  email={hospital.email}
                  services={hospital.specialties}
                  openHours={hospital.openHours}
                  rating={hospital.rating}
                  emergency={hospital.emergency}
                />
              ))}
            </div>
          </div>
        );
      
      case 'doctor':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <MyDoctor />
          </div>
        );
      
      default:
        return <Hero onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        {renderContent()}
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Pawsta</h3>
              <p className="text-gray-400 text-sm">
                Connecting pets with loving families and providing comprehensive pet care services.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Pet Adoption</li>
                <li>Vaccination Centers</li>
                <li>Vet Hospitals</li>
                <li>AI Doctor Consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Emergency Care</li>
                <li>Pet Care Tips</li>
                <li>Adoption Process</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@pawsta.com</li>
                <li>(555) PAWSTA-1</li>
                <li>24/7 Emergency Line</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Pawsta. All rights reserved. Made with ❤️ for pets and their families.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;