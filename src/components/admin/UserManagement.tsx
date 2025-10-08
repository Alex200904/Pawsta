import { useState } from 'react';
import { Search, UserCheck, UserX, Mail, Phone, MapPin } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  lastActive: string;
  adoptionCount: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY',
      isActive: true,
      createdAt: '2024-01-15',
      lastActive: '2024-03-10',
      adoptionCount: 2
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      fullName: 'Jane Smith',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA',
      isActive: true,
      createdAt: '2024-02-20',
      lastActive: '2024-03-09',
      adoptionCount: 1
    },
    {
      id: '3',
      email: 'mike.johnson@example.com',
      fullName: 'Mike Johnson',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Chicago, IL',
      isActive: false,
      createdAt: '2024-01-10',
      lastActive: '2024-02-15',
      adoptionCount: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && user.isActive) ||
      (filterStatus === 'inactive' && !user.isActive);

    return matchesSearch && matchesFilter;
  });

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    totalAdoptions: users.reduce((sum, u) => sum + u.adoptionCount, 0)
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">User Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Active Users</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Inactive Users</p>
            <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm mb-1">Total Adoptions</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalAdoptions}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 divide-y divide-slate-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-slate-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{user.fullName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {user.adoptionCount > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {user.adoptionCount} {user.adoptionCount === 1 ? 'Adoption' : 'Adoptions'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    user.isActive
                      ? 'bg-red-50 text-red-700 hover:bg-red-100'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {user.isActive ? (
                    <>
                      <UserX className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">Member since:</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Last active: {new Date(user.lastActive).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-600">No users found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
