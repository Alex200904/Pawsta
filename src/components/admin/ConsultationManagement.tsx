import { useState } from 'react';
import { MessageSquare, Check, X, Clock, User, PawPrint, Filter } from 'lucide-react';

interface ConsultationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  petId?: string;
  petName?: string;
  consultationType: string;
  preferredDate: string;
  message: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  adminResponse: string;
  createdAt: string;
}

export default function ConsultationManagement() {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@example.com',
      petId: '1',
      petName: 'Max',
      consultationType: 'Behavioral Assessment',
      preferredDate: '2024-03-18T15:00:00',
      message: 'I would like to understand Max\'s temperament and behavior patterns. I have two young children and want to ensure he would be a good fit for our family.',
      status: 'Pending',
      adminResponse: '',
      createdAt: '2024-03-12T10:30:00'
    },
    {
      id: '2',
      userId: '2',
      userName: 'David Brown',
      userEmail: 'david.brown@example.com',
      consultationType: 'General Pet Care',
      preferredDate: '2024-03-17T13:00:00',
      message: 'First-time pet owner. Need comprehensive guidance on pet care, feeding schedule, and training basics.',
      status: 'Pending',
      adminResponse: '',
      createdAt: '2024-03-11T14:20:00'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Davis',
      userEmail: 'emily.davis@example.com',
      petId: '2',
      petName: 'Luna',
      consultationType: 'Health & Nutrition',
      preferredDate: '2024-03-16T11:00:00',
      message: 'Luna has specific dietary needs. Would like to discuss proper nutrition plan and feeding schedule.',
      status: 'Approved',
      adminResponse: 'Approved! Our veterinary consultant will contact you within 24 hours to schedule the consultation.',
      createdAt: '2024-03-10T09:15:00'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Tom Anderson',
      userEmail: 'tom.anderson@example.com',
      consultationType: 'Adoption Process',
      preferredDate: '2024-03-15T14:00:00',
      message: 'Need clarification on the adoption process, requirements, and paperwork involved.',
      status: 'Rejected',
      adminResponse: 'This information is available on our website. Please review our adoption guide or contact our support team.',
      createdAt: '2024-03-09T16:45:00'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRequest | null>(null);
  const [adminResponse, setAdminResponse] = useState('');

  const filteredConsultations = consultations.filter(consult => {
    if (filterStatus === 'all') return true;
    return consult.status === filterStatus;
  });

  const handleApprove = () => {
    if (!selectedConsultation) return;

    setConsultations(consultations.map(consult =>
      consult.id === selectedConsultation.id
        ? {
            ...consult,
            status: 'Approved',
            adminResponse: adminResponse || 'Your consultation request has been approved. We will contact you shortly.'
          }
        : consult
    ));
    setSelectedConsultation(null);
    setAdminResponse('');
  };

  const handleReject = () => {
    if (!selectedConsultation) return;

    setConsultations(consultations.map(consult =>
      consult.id === selectedConsultation.id
        ? {
            ...consult,
            status: 'Rejected',
            adminResponse: adminResponse || 'Your consultation request has been reviewed and we cannot proceed at this time.'
          }
        : consult
    ));
    setSelectedConsultation(null);
    setAdminResponse('');
  };

  const stats = {
    pending: consultations.filter(c => c.status === 'Pending').length,
    approved: consultations.filter(c => c.status === 'Approved').length,
    rejected: consultations.filter(c => c.status === 'Rejected').length,
    total: consultations.length
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Consultation Requests</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-slate-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredConsultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {consultation.consultationType}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{consultation.userName}</span>
                    </div>
                    {consultation.petName && (
                      <div className="flex items-center gap-1">
                        <PawPrint className="w-4 h-4" />
                        <span>{consultation.petName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Preferred: {new Date(consultation.preferredDate).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                consultation.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                consultation.status === 'Approved' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {consultation.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Contact:</p>
                <p className="text-sm text-slate-600">{consultation.userEmail}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">User Message:</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg leading-relaxed">
                  {consultation.message}
                </p>
              </div>

              {consultation.adminResponse && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Admin Response:</p>
                  <p className="text-sm text-slate-600 bg-blue-50 p-4 rounded-lg leading-relaxed">
                    {consultation.adminResponse}
                  </p>
                </div>
              )}

              <div className="text-xs text-slate-500">
                Submitted on: {new Date(consultation.createdAt).toLocaleString()}
              </div>
            </div>

            {consultation.status === 'Pending' && (
              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedConsultation(consultation);
                    setAdminResponse('');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedConsultation(consultation);
                    setAdminResponse('');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredConsultations.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No consultation requests found matching the selected filter.</p>
        </div>
      )}

      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Review Consultation Request
            </h3>

            <div className="mb-4 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">From:</span> {selectedConsultation.userName}
              </p>
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">Type:</span> {selectedConsultation.consultationType}
              </p>
              {selectedConsultation.petName && (
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Pet:</span> {selectedConsultation.petName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Response Message <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Add a personalized message to the user..."
              />
              <p className="text-xs text-slate-500 mt-2">
                This message will be sent to the user via email.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedConsultation(null);
                  setAdminResponse('');
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
