import React, { useState } from 'react';
import { Send, Bot, User, CheckCircle } from 'lucide-react';
import { Consultation } from '../types';

interface MyDoctorProps {}

const MyDoctor: React.FC<MyDoctorProps> = () => {
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [problem, setProblem] = useState('');
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock AI responses for different pet problems
  const getAISolution = (problem: string): string => {
    const problemKeywords = problem.toLowerCase();
    
    if (problemKeywords.includes('vomit') || problemKeywords.includes('sick')) {
      return "If your pet is vomiting, withhold food for 12-24 hours but ensure they have access to water. If vomiting persists or you notice blood, lethargy, or dehydration, contact your vet immediately. Start with bland food like boiled chicken and rice when reintroducing food.";
    }
    
    if (problemKeywords.includes('not eating') || problemKeywords.includes('appetite')) {
      return "Loss of appetite can indicate various issues. Ensure fresh water is available. Try offering their favorite treats or warming their food slightly. If they haven't eaten for 24+ hours (12+ for cats), or show other symptoms like lethargy or vomiting, consult your vet immediately.";
    }
    
    if (problemKeywords.includes('scratch') || problemKeywords.includes('itch')) {
      return "Excessive scratching could indicate allergies, fleas, or skin conditions. Check for visible parasites or skin irritation. Keep their nails trimmed, ensure they're up to date on flea prevention, and consider an oatmeal bath for relief. If scratching persists, see your vet for proper diagnosis.";
    }
    
    if (problemKeywords.includes('diarrhea') || problemKeywords.includes('loose stool')) {
      return "For mild diarrhea, withhold food for 12-24 hours while maintaining water access. Then try a bland diet of boiled chicken and rice. If diarrhea contains blood, lasts more than 2 days, or your pet shows signs of dehydration, contact your vet immediately.";
    }
    
    if (problemKeywords.includes('cough') || problemKeywords.includes('breathing')) {
      return "Persistent coughing or breathing difficulties require immediate attention. Keep your pet calm and in a well-ventilated area. If breathing is labored, gums are blue/pale, or coughing is severe, this is an emergency - contact your vet or emergency clinic immediately.";
    }
    
    if (problemKeywords.includes('limping') || problemKeywords.includes('leg') || problemKeywords.includes('walk')) {
      return "For mild limping, restrict activity and observe. Check the paw for cuts, thorns, or swelling. Apply ice for 10-15 minutes if there's swelling. If limping persists for more than 24 hours, worsens, or your pet won't bear weight, see your vet for examination.";
    }
    
    return "Thank you for reaching out about your pet's health. While I can provide general guidance, it's important to consult with a veterinarian for proper diagnosis and treatment. Monitor your pet closely and don't hesitate to contact a professional if symptoms worsen or persist.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim() || !ownerName.trim() || !problem.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newConsultation: Consultation = {
      id: Date.now().toString(),
      petName,
      ownerName,
      problem,
      solution: getAISolution(problem),
      timestamp: new Date()
    };

    setConsultations(prev => [newConsultation, ...prev]);
    setPetName('');
    setOwnerName('');
    setProblem('');
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <Bot className="h-8 w-8 text-blue-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Pet Doctor</h2>
          <p className="text-gray-600">Get instant solutions for your pet's health concerns</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-2">
                Pet's Name
              </label>
              <input
                type="text"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your pet's name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">
              Describe the Problem
            </label>
            <textarea
              id="problem"
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your pet's symptoms or health concerns in detail..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !petName.trim() || !ownerName.trim() || !problem.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Getting Solution...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Get Instant Solution
              </>
            )}
          </button>
        </form>
      </div>

      {consultations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Consultations</h3>
          {consultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{consultation.ownerName}</span>
                  <span className="text-gray-500 mx-2">•</span>
                  <span className="text-gray-500">{consultation.petName}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {consultation.timestamp.toLocaleString()}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Problem:</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{consultation.problem}</p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <Bot className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-medium text-gray-900">AI Doctor's Solution:</h4>
                  <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                </div>
                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg leading-relaxed">{consultation.solution}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDoctor;