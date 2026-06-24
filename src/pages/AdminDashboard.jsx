import React, { useState, useEffect } from 'react';
import { 
  getAdminDashboardStats, 
  getAdminUsers, 
  deleteAdminUser, 
  exportAdminUsers 
} from '../services/adminService';
import { toast } from 'react-toastify';
import { 
  Users, Activity, MessageSquare, Brain, 
  Search, Download, Trash2, Eye, ChevronLeft, ChevronRight, X
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMoodEntries: 0,
    totalChatMessages: 0
  });
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const limit = 10;

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, search, statusFilter]);

  const fetchStats = async () => {
    try {
      const res = await getAdminDashboardStats();
      if (res?.data) setStats(res.data);
    } catch {
      toast.error('Failed to fetch dashboard stats');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers({ page, limit, search, status: statusFilter });
      if (res?.data) {
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
        setTotalPages(res.data.pages);
      }
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteAdminUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
        fetchStats();
      } catch {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportAdminUsers();
      toast.success('Export started');
    } catch {
      toast.error('Failed to export users');
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 pt-28 pb-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300 tracking-tight">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage users and platform statistics.</p>
          </div>
          <button 
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold rounded-xl px-5 py-2.5 text-sm shadow-lg shadow-teal-500/30 dark:shadow-teal-900/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Export Users
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Users" value={stats.totalUsers} icon={<Users className="w-6 h-6 text-blue-500" />} />
          <StatCard title="Active Users" value={stats.activeUsers} icon={<Activity className="w-6 h-6 text-emerald-500" />} />
          <StatCard title="Mood Entries" value={stats.totalMoodEntries} icon={<Brain className="w-6 h-6 text-purple-500" />} />
          <StatCard title="Chat Messages" value={stats.totalChatMessages} icon={<MessageSquare className="w-6 h-6 text-amber-500" />} />
        </div>

        {/* Users Table Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-md">
          {/* Controls */}
          <div className="p-5 border-b border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <div className="relative w-full sm:max-w-xs group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search name or email..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-slate-200 placeholder:text-slate-400/80"
              />
            </div>
            <div className="w-full sm:w-auto">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full sm:w-auto px-4 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all dark:text-slate-200 appearance-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/50 dark:border-slate-700/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Registration Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={`skeleton-${i}`} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full skeleton-shimmer flex-shrink-0"></div>
                          <div className="w-32 h-4 rounded-md skeleton-shimmer"></div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="w-48 h-4 rounded-md skeleton-shimmer"></div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="w-24 h-4 rounded-md skeleton-shimmer"></div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="w-16 h-6 rounded-full skeleton-shimmer"></div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-7 h-7 rounded-lg skeleton-shimmer"></div>
                          <div className="w-7 h-7 rounded-lg skeleton-shimmer"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">No users found.</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id} className="hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-colors duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-bold uppercase flex-shrink-0">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.isVerified 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.isVerified ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {user.isVerified ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openUserDetails(user)}
                            className="p-1.5 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-900 dark:text-white">{users.length}</span> of <span className="font-medium text-slate-900 dark:text-white">{totalUsers}</span> users
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                Page {page} of {totalPages || 1}
              </span>
              <button
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity" />
          <div 
            className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 dark:border-slate-700/50 overflow-hidden transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">User Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold uppercase flex-shrink-0">
                  {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {selectedUser.isVerified ? 'Active (Verified)' : 'Pending Verification'}
                  </p>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Joined Date</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 capitalize">
                    {selectedUser.gender || 'Not specified'}
                  </p>
                </div>
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Age</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {selectedUser.age || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-teal-500/30 dark:hover:border-teal-400/30 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 group">
    <div className="p-3 bg-slate-50/80 dark:bg-slate-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
