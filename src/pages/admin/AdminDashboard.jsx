import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Link to="/admin/manage-users" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">👥 Manage Users</h2>
                    <p className="text-gray-500 mt-2">View and manage all users</p>
                </Link>
                <Link to="/admin/generate-reports" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">📊 Generate Reports</h2>
                    <p className="text-gray-500 mt-2">View system reports</p>
                </Link>
                <Link to="/admin/monitor-system" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">🖥️ Monitor System</h2>
                    <p className="text-gray-500 mt-2">Monitor system status</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
