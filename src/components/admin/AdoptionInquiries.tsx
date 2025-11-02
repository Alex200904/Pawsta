import { useState } from 'react';
import { Search, Filter, Eye, MessageSquare, CheckCircle, Clock, AlertCircle, Trash2, X } from 'lucide-react';

interface AdoptionInquiry {
  id: string;
  petName: string;
  petId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  inquiryMessage: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Approved' | 'Rejected' | 'Completed';
  inquiryDate: string;
  responseDate?: string;
  adminNotes: string;
  petImage: string;
}

export default function AdoptionInquiries() {
  const [inquiries, setInquiries] = useState<AdoptionInquiry[]>([
    {
      id: '1',
      petName: 'Max',
      petId: '1',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      userPhone: '+1 (555) 123-4567',
      userAddress: '123 Main St, New York, NY',
      inquiryMessage: 'Very interested in adopting Max. Have experience with large dogs and an active lifestyle.',
      status: 'New',
      inquiryDate: '2024-03-12T10:30:00',
      adminNotes: '',
      petImage: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      petName: 'Luna',
      petId: '2',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@example.com',
      userPhone: '+1 (555) 234-5678',
      userAddress: '456 Oak Ave, Los Angeles, CA',
      inquiryMessage: 'Looking for a quiet cat to keep me company. First time cat owner.',
      status: 'Contacted',
      inquiryDate: '2024-03-11T14:20:00',
      responseDate: '2024-03-12T09:15:00',
      adminNotes: 'Contacted via email. Waiting for response.',
      petImage: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      petName: 'Bella',
      petId: '3',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@example.com',
      userPhone: '+1 (555) 345-6789',
      userAddress: '789 Pine Rd, Chicago, IL',
      inquiryMessage: 'Interested in Bella. Have a large backyard and kids.',
      status: 'Scheduled',
      inquiryDate: '2024-03-10T16:45:00',
      responseDate: '2024-03-11T11:30:00',
      adminNotes: 'Meeting scheduled for March 15 at 2:00 PM',
      petImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      petName: 'Charlie',
      petId: '4',
      userName: 'Emily Davis',
      userEmail: 'emily.davis@example.com',
      userPhone: '+1 (555) 456-7890',
      userAddress: '321 Elm St, Boston, MA',
      inquiryMessage: 'Charlie looks perfect for our family!',
      status: 'Approved',
      inquiryDate: '2024-03-09T13:00:00',
      responseDate: '2024-03-10T10:00:00',
      adminNotes: 'Approved for adoption. Paperwork in progress.',
      petImage: 'https://images.pexels.com/photos/1408712/pexels-photo-1408712.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      petName: 'Oscar',
      petId: '5',
      userName: 'Tom Anderson',
      userEmail: 'tom.anderson@example.com',
      userPhone: '+1 (555) 567-8901',
      userAddress: '654 Maple Dr, Seattle, WA',
      inquiryMessage: 'Not suitable for our home after further consideration.',
      status: 'Rejected',
      inquiryDate: '2024-03-08T15:30:00',
      responseDate: '2024-03-09T09:30:00',
      adminNotes: 'Applicant decided Oscar needs quiet environment they cannot provide.',
      petImage: 'https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<AdoptionInquiry | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch =
      inquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.userEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Contacted':
        return 'bg-purple-100 text-purple-700';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Completed':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <AlertCircle className="w-4 h-4" />;
      case 'Contacted':
        return <MessageSquare className="w-4 h-4" />;
      case 'Scheduled':
        return <Clock className="w-4 h-4" />;
      case 'Approved':
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const updateStatus = (id: string, newStatus: AdoptionInquiry['status']) => {
    setInquiries(inquiries.map(inquiry =>
      inquiry.id === id
        ? {
            ...inquiry,
            status: newStatus,
            responseDate: inquiry.responseDate || new Date().toISOString(),
            adminNotes: adminNote || inquiry.adminNotes
          }
        : inquiry
    ));
    setSelectedInquiry(null);
    setAdminNote('');
  };

  const deleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
    }
  };

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'New').length,
    contacted: inquiries.filter(i => i.status === 'Contacted').length,
    scheduled: inquiries.filter(i => i.status === 'Scheduled').length,
    approved: inquiries.filter(i => i.status === 'Approved').length
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Adoption Inquiries</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Inquiries</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">New</p>
            <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Contacted</p>
            <p className="text-2xl font-bold text-purple-600">{stats.contacted}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Scheduled</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, pet, or email..."
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
            <option value="Contacted">Contacted</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Pet & Inquirer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Inquiry Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={inquiry.petImage}
                        alt={inquiry.petName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-slate-900">{inquiry.petName}</p>
                        <p className="text-sm text-slate-600">{inquiry.userName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <p>{inquiry.userEmail}</p>
                    <p>{inquiry.userPhone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                      {getStatusIcon(inquiry.status)}
                      {inquiry.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(inquiry.inquiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setAdminNote(inquiry.adminNotes);
                        }}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteInquiry(inquiry.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInquiries.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <p className="text-slate-600">No inquiries found matching your search criteria.</p>
        </div>
      )}

      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Adoption Inquiry Details</h3>
              <button
                onClick={() => {
                  setSelectedInquiry(null);
                  setAdminNote('');
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4 pb-4 border-b border-slate-200">
                <img
                  src={selectedInquiry.petImage}
                  alt={selectedInquiry.petName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm text-slate-600">Pet</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedInquiry.petName}</p>
                  <p className="text-sm text-slate-600">Inquired on {new Date(selectedInquiry.inquiryDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Inquirer Name</p>
                  <p className="text-slate-900">{selectedInquiry.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Email</p>
                  <p className="text-slate-900">{selectedInquiry.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Phone</p>
                  <p className="text-slate-900">{selectedInquiry.userPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Status</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                    {getStatusIcon(selectedInquiry.status)}
                    {selectedInquiry.status}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">Address</p>
                <p className="text-slate-600">{selectedInquiry.userAddress}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Inquiry Message</p>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{selectedInquiry.inquiryMessage}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Admin Notes</label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Add internal notes about this inquiry..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Contacted')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Scheduled')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                >
                  Schedule Meeting
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedInquiry.id, 'Rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Reject
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedInquiry(null);
                  setAdminNote('');
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
