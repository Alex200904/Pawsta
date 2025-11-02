import { useState } from 'react';
import { Search, Filter, Eye, AlertTriangle, Clock, CheckCircle, XCircle, Trash2, X, MapPin, Phone, Mail } from 'lucide-react';

interface RescueRequest {
  id: string;
  petType: string;
  location: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Assigned' | 'In Progress' | 'Rescued' | 'Failed' | 'Closed';
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  reportDate: string;
  assignedTo?: string;
  lastUpdate?: string;
  rescueNotes: string;
  imageUrl: string;
}

export default function RescueRequests() {
  const [rescueRequests, setRescueRequests] = useState<RescueRequest[]>([
    {
      id: 'R001',
      petType: 'Dog',
      location: 'Downtown Park, 5th Avenue',
      description: 'Large golden retriever, appears injured, collar visible but no ID tags. Seen in the park for 3 days.',
      urgency: 'Critical',
      status: 'In Progress',
      reporterName: 'Alice Chen',
      reporterPhone: '+1 (555) 111-2222',
      reporterEmail: 'alice.chen@example.com',
      reportDate: '2024-03-12T08:15:00',
      assignedTo: 'John Smith',
      lastUpdate: '2024-03-12T14:30:00',
      rescueNotes: 'Team dispatched. Attempting capture with food incentives.',
      imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'R002',
      petType: 'Cat',
      location: 'Riverside Apartments, Building C',
      description: 'White cat stuck in tree for 2 days. Owners very concerned. Can hear meowing.',
      urgency: 'High',
      status: 'Assigned',
      reporterName: 'Robert Taylor',
      reporterPhone: '+1 (555) 222-3333',
      reporterEmail: 'robert.taylor@example.com',
      reportDate: '2024-03-11T16:45:00',
      assignedTo: 'Sarah Johnson',
      rescueNotes: 'Ladder and tall equipment needed. Scheduled for tomorrow morning.',
      imageUrl: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'R003',
      petType: 'Dog',
      location: 'Highway 101, Mile Marker 42',
      description: 'Small puppy seen running along busy highway. Appears to be a mixed breed, very scared.',
      urgency: 'Critical',
      status: 'New',
      reporterName: 'Michael Torres',
      reporterPhone: '+1 (555) 333-4444',
      reporterEmail: 'michael.torres@example.com',
      reportDate: '2024-03-12T17:20:00',
      rescueNotes: '',
      imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'R004',
      petType: 'Bird',
      location: 'City Zoo, North Entrance',
      description: 'Injured parrot found near zoo entrance. Wing appears damaged. Still responsive.',
      urgency: 'High',
      status: 'Rescued',
      reporterName: 'Jennifer Lee',
      reporterPhone: '+1 (555) 444-5555',
      reporterEmail: 'jennifer.lee@example.com',
      reportDate: '2024-03-10T11:30:00',
      assignedTo: 'Dr. Emily Watson',
      lastUpdate: '2024-03-11T10:00:00',
      rescueNotes: 'Successfully rescued. Transferred to wildlife rehabilitation center for treatment.',
      imageUrl: 'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'R005',
      petType: 'Dog',
      location: 'Industrial Area, Warehouse District',
      description: 'Pack of stray dogs creating disturbance. Residents report aggressive behavior.',
      urgency: 'Medium',
      status: 'Failed',
      reporterName: 'David Martinez',
      reporterPhone: '+1 (555) 555-6666',
      reporterEmail: 'david.martinez@example.com',
      reportDate: '2024-03-08T13:00:00',
      lastUpdate: '2024-03-09T15:00:00',
      rescueNotes: 'Animals too aggressive for capture. Referred to animal control and police department.',
      imageUrl: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<RescueRequest | null>(null);
  const [rescueNotes, setRescueNotes] = useState('');

  const filteredRequests = rescueRequests.filter(request => {
    const matchesSearch =
      request.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reporterName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || request.urgency === filterUrgency;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-slate-100 text-slate-700';
      case 'Assigned':
        return 'bg-blue-100 text-blue-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rescued':
        return 'bg-green-100 text-green-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      case 'Closed':
        return 'bg-slate-200 text-slate-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const updateStatus = (id: string, newStatus: RescueRequest['status']) => {
    setRescueRequests(rescueRequests.map(request =>
      request.id === id
        ? {
            ...request,
            status: newStatus,
            lastUpdate: new Date().toISOString(),
            rescueNotes: rescueNotes || request.rescueNotes
          }
        : request
    ));
    setSelectedRequest(null);
    setRescueNotes('');
  };

  const deleteRequest = (id: string) => {
    if (confirm('Are you sure you want to delete this rescue request?')) {
      setRescueRequests(rescueRequests.filter(request => request.id !== id));
    }
  };

  const stats = {
    total: rescueRequests.length,
    new: rescueRequests.filter(r => r.status === 'New').length,
    inProgress: rescueRequests.filter(r => r.status === 'In Progress').length,
    rescued: rescueRequests.filter(r => r.status === 'Rescued').length,
    critical: rescueRequests.filter(r => r.urgency === 'Critical').length
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Rescue Requests</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">New</p>
            <p className="text-2xl font-bold text-slate-700">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Rescued</p>
            <p className="text-2xl font-bold text-green-600">{stats.rescued}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Critical</p>
            <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, pet type, or reporter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Rescued">Rescued</option>
            <option value="Failed">Failed</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="all">All Urgency</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <img
                  src={request.imageUrl}
                  alt={request.petType}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {request.petType} Rescue Request
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{request.location}</span>
                    </div>
                    <span>ID: {request.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            </div>

            <p className="text-slate-700 mb-4">{request.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-600">Reporter</p>
                <p className="font-medium text-slate-900">{request.reporterName}</p>
                <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                  <Phone className="w-4 h-4" />
                  <span>{request.reporterPhone}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600">Report Date</p>
                <p className="font-medium text-slate-900">{new Date(request.reportDate).toLocaleString()}</p>
                {request.assignedTo && (
                  <p className="text-sm text-slate-600 mt-1">Assigned to: <span className="font-medium">{request.assignedTo}</span></p>
                )}
              </div>
            </div>

            {request.rescueNotes && (
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-700 mb-1">Rescue Notes</p>
                <p className="text-sm text-slate-600">{request.rescueNotes}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedRequest(request);
                  setRescueNotes(request.rescueNotes);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View & Update
              </button>
              <button
                onClick={() => deleteRequest(request.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <p className="text-slate-600">No rescue requests found matching your criteria.</p>
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Rescue Request: {selectedRequest.id}</h3>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setRescueNotes('');
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4 pb-4 border-b border-slate-200">
                <img
                  src={selectedRequest.imageUrl}
                  alt={selectedRequest.petType}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm text-slate-600">Pet Type</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedRequest.petType}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                      {selectedRequest.urgency}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">Location</p>
                <p className="flex items-center gap-2 text-slate-900">
                  <MapPin className="w-4 h-4" />
                  {selectedRequest.location}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Reporter Name</p>
                  <p className="text-slate-900">{selectedRequest.reporterName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Phone</p>
                  <p className="text-slate-900">{selectedRequest.reporterPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Email</p>
                  <p className="text-slate-900">{selectedRequest.reporterEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Report Date</p>
                  <p className="text-slate-900">{new Date(selectedRequest.reportDate).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rescue Notes</label>
                <textarea
                  value={rescueNotes}
                  onChange={(e) => setRescueNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Update rescue progress, actions taken, current status..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(selectedRequest.id, 'Assigned')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Assign Team
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest.id, 'In Progress')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest.id, 'Rescued')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Rescued
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest.id, 'Failed')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Unable to Rescue
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setRescueNotes('');
                }}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
