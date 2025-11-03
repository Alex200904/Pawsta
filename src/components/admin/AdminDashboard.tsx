import { useState } from 'react';
import { BarChart3, PawPrint, Users, Calendar, CheckCircle, XCircle, TrendingUp, LogOut, AlertTriangle, Heart } from 'lucide-react';
import PetManagement from './PetManagement';
import UserManagement from './UserManagement';
import AppointmentManagement from './AppointmentManagement';
import ConsultationManagement from './ConsultationManagement';
import AdoptionInquiries from './AdoptionInquiries';
import RescueRequests from './RescueRequests';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'users' | 'appointments' | 'consultations' | 'adoptions' | 'rescues'>('overview');

  const stats = [
    {
      label: 'Total Pets',
      value: '48',
      change: '+12%',
      icon: PawPrint,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: 'Pending Appointments',
      value: '23',
      change: '+5%',
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      label: 'Adoptions This Month',
      value: '15',
      change: '+20%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    { type: 'adoption', user: 'John Doe', pet: 'Max', time: '2 hours ago' },
    { type: 'appointment', user: 'Jane Smith', action: 'scheduled appointment', time: '4 hours ago' },
    { type: 'consultation', user: 'Mike Johnson', action: 'requested consultation', time: '6 hours ago' },
    { type: 'pet', action: 'added new pet', pet: 'Bella', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'pets'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Pets
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'appointments'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'consultations'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Consultations
          </button>
          <button
            onClick={() => setActiveTab('adoptions')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'adoptions'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Adoption Inquiries
          </button>
          <button
            onClick={() => setActiveTab('rescues')}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'rescues'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Rescue Requests
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'adoption' ? 'bg-purple-100' :
                        activity.type === 'appointment' ? 'bg-yellow-100' :
                        activity.type === 'consultation' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        {activity.type === 'adoption' && <CheckCircle className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'appointment' && <Calendar className="w-5 h-5 text-yellow-600" />}
                        {activity.type === 'consultation' && <Users className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'pet' && <PawPrint className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-medium">
                          {activity.user ? `${activity.user} ` : ''}
                          {activity.type === 'adoption' && `adopted ${activity.pet}`}
                          {activity.type === 'appointment' && activity.action}
                          {activity.type === 'consultation' && activity.action}
                          {activity.type === 'pet' && `${activity.action} "${activity.pet}"`}
                        </p>
                        <p className="text-slate-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setActiveTab('pets')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <PawPrint className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Add New Pet</p>
                      <p className="text-sm text-slate-600">Add a pet to the adoption list</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <Calendar className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Review Appointments</p>
                      <p className="text-sm text-slate-600">Approve or reject pending requests</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <CheckCircle className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Review Consultations</p>
                      <p className="text-sm text-slate-600">Process consultation requests</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <Users className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Manage Users</p>
                      <p className="text-sm text-slate-600">View and manage user accounts</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('adoptions')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <Heart className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Adoption Inquiries</p>
                      <p className="text-sm text-slate-600">Track pet adoption requests</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('rescues')}
                    className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-left"
                  >
                    <AlertTriangle className="w-5 h-5 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-900">Rescue Requests</p>
                      <p className="text-sm text-slate-600">Monitor pet rescue operations</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'pets' && <PetManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'appointments' && <AppointmentManagement />}
        {activeTab === 'consultations' && <ConsultationManagement />}
        {activeTab === 'adoptions' && <AdoptionInquiries />}
        {activeTab === 'rescues' && <RescueRequests />}
      </div>
    </div>
  );
}
