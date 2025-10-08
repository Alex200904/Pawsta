import { useState } from 'react';
import { Calendar, Check, X, Clock, User, PawPrint, Filter } from 'lucide-react';

interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  petId?: string;
  petName?: string;
  appointmentType: string;
  scheduledDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  notes: string;
  adminNotes: string;
  createdAt: string;
}

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      petId: '1',
      petName: 'Max',
      appointmentType: 'Adoption Interview',
      scheduledDate: '2024-03-15T10:00:00',
      status: 'Pending',
      notes: 'Interested in adopting Max. Have experience with large dogs.',
      adminNotes: '',
      createdAt: '2024-03-10T14:30:00'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      appointmentType: 'Consultation',
      scheduledDate: '2024-03-16T14:00:00',
      status: 'Pending',
      notes: 'First-time pet owner, need guidance on choosing the right pet.',
      adminNotes: '',
      createdAt: '2024-03-11T09:15:00'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@example.com',
      petId: '2',
      petName: 'Luna',
      appointmentType: 'Visit',
      scheduledDate: '2024-03-14T11:00:00',
      status: 'Approved',
      notes: 'Would like to meet Luna before making a decision.',
      adminNotes: 'Approved. Customer seems genuine and prepared.',
      createdAt: '2024-03-09T16:45:00'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const filteredAppointments = appointments.filter(apt => {
    if (filterStatus === 'all') return true;
    return apt.status === filterStatus;
  });

  const handleApprove = (appointment: Appointment) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointment.id
        ? { ...apt, status: 'Approved', adminNotes: adminNote || 'Approved by admin' }
        : apt
    ));
    setSelectedAppointment(null);
    setAdminNote('');
  };

  const handleReject = (appointment: Appointment) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointment.id
        ? { ...apt, status: 'Rejected', adminNotes: adminNote || 'Rejected by admin' }
        : apt
    ));
    setSelectedAppointment(null);
    setAdminNote('');
  };

  const stats = {
    pending: appointments.filter(a => a.status === 'Pending').length,
    approved: appointments.filter(a => a.status === 'Approved').length,
    rejected: appointments.filter(a => a.status === 'Rejected').length,
    total: appointments.length
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Appointment Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Appointments</p>
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
            <option value="all">All Appointments</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {appointment.appointmentType}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{appointment.userName}</span>
                    </div>
                    {appointment.petName && (
                      <div className="flex items-center gap-1">
                        <PawPrint className="w-4 h-4" />
                        <span>{appointment.petName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(appointment.scheduledDate).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                appointment.status === 'Approved' ? 'bg-green-100 text-green-700' :
                appointment.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                appointment.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">User Notes:</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                  {appointment.notes}
                </p>
              </div>

              {appointment.adminNotes && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Admin Notes:</p>
                  <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                    {appointment.adminNotes}
                  </p>
                </div>
              )}

              <div className="text-xs text-slate-500">
                Requested on: {new Date(appointment.createdAt).toLocaleString()}
              </div>
            </div>

            {appointment.status === 'Pending' && (
              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setAdminNote('');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setAdminNote('');
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

      {filteredAppointments.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">No appointments found matching the selected filter.</p>
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {selectedAppointment.status === 'Pending' ? 'Review Appointment' : 'Add Admin Notes'}
            </h3>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">
                Appointment with <span className="font-medium">{selectedAppointment.userName}</span>
              </p>
              <p className="text-sm text-slate-600">
                Type: <span className="font-medium">{selectedAppointment.appointmentType}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Admin Notes (Optional)
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Add any notes for this decision..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedAppointment(null);
                  setAdminNote('');
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(selectedAppointment)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedAppointment)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
