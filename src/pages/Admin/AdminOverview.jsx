import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
    FaUsers, 
    FaChalkboardTeacher, 
    FaMoneyBillWave, 
    FaLayerGroup,
    FaUserGraduate,
    FaUserShield
} from 'react-icons/fa';

// Loading Skeleton
const StatSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse h-32"></div>
);

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure();

    // 1. Fetch All Users
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        }
    });

    // 2. Fetch All Tuitions
    const { data: tuitions = [], isLoading: tuitionsLoading } = useQuery({
        queryKey: ['admin-tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tutions');
            return res.data;
        }
    });

    // 3. Fetch Financial Reports (Payments)
    const { data: reportData, isLoading: reportLoading } = useQuery({
        queryKey: ['admin-reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reports');
            return res.data;
        }
    });

    // 4. Fetch All Applications (to see hiring activity)
    const { data: applications = [], isLoading: appLoading } = useQuery({
        queryKey: ['admin-applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res.data;
        }
    });

    const isLoading = usersLoading || tuitionsLoading || reportLoading || appLoading;

    if (isLoading) {
        return (
            <div className="p-8 space-y-6">
                 <div className="h-8 bg-gray-200 w-1/4 rounded mb-6"></div>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => <StatSkeleton key={i}/>)}
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-80">
                    <div className="bg-gray-100 rounded-2xl animate-pulse"></div>
                    <div className="bg-gray-100 rounded-2xl animate-pulse"></div>
                 </div>
            </div>
        );
    }

    // --- DATA PROCESSING FOR CHARTS ---

    // 1. Calculate Counts
    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalTutors = users.filter(u => u.role === 'tutor').length;
    const totalAdmins = users.filter(u => u.role === 'admin').length;
    const totalRevenue = reportData?.totalEarnings || 0;

    // 2. Pie Chart Data (User Distribution)
    const userRoleData = [
        { name: 'Students', value: totalStudents, color: '#0088FE' }, // Blue
        { name: 'Tutors', value: totalTutors, color: '#00C49F' },     // Teal
        { name: 'Admins', value: totalAdmins, color: '#FFBB28' },     // Yellow
    ];

    // 3. Bar Chart Data (Platform Activity)
    const activityData = [
        { name: 'Tuitions', count: tuitions.length, fill: '#8884d8' },
        { name: 'Applications', count: applications.length, fill: '#82ca9d' },
        { name: 'Hires', count: applications.filter(a => a.status === 'approved').length, fill: '#ffc658' },
    ];

    // 4. Area Chart Data (Revenue Over Time)
    // Group payments by date (simple grouping)
    const payments = reportData?.payments || [];
    const revenueMap = {};
    
    payments.forEach(pay => {
        const date = new Date(pay.createdAt).toLocaleDateString();
        revenueMap[date] = (revenueMap[date] || 0) + pay.amount;
    });

    const revenueChartData = Object.keys(revenueMap).map(date => ({
        date,
        amount: revenueMap[date]
    })).slice(-7); // Last 7 days/entries for cleaner view

    return (
        <div className="p-6 md:p-8 bg-base-100/50 min-h-screen space-y-8">
            
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-base-content">Admin Dashboard</h2>
                    <p className="text-sm text-base-content/60">Welcome back, here is what's happening today.</p>
                </div>
                <div className="badge badge-primary badge-lg p-4 font-bold">
                    Admin Access
                </div>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue Card */}
                <div className="stats shadow-md bg-white border-l-4 border-success overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-success bg-success/10 p-3 rounded-full">
                            <FaMoneyBillWave className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Total Revenue</div>
                        <div className="stat-value text-success text-3xl">৳{totalRevenue}</div>
                        <div className="stat-desc">Lifetime earnings</div>
                    </div>
                </div>

                {/* Total Users Card */}
                <div className="stats shadow-md bg-white border-l-4 border-primary overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
                            <FaUsers className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Total Users</div>
                        <div className="stat-value text-primary text-3xl">{users.length}</div>
                        <div className="stat-desc">Students, Tutors & Admins</div>
                    </div>
                </div>

                {/* Tutors Card */}
                <div className="stats shadow-md bg-white border-l-4 border-secondary overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-secondary bg-secondary/10 p-3 rounded-full">
                            <FaChalkboardTeacher className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Total Tutors</div>
                        <div className="stat-value text-secondary text-3xl">{totalTutors}</div>
                        <div className="stat-desc">{((totalTutors / users.length) * 100).toFixed(0)}% of userbase</div>
                    </div>
                </div>

                {/* Applications Card */}
                <div className="stats shadow-md bg-white border-l-4 border-warning overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-warning bg-warning/10 p-3 rounded-full">
                            <FaLayerGroup className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Applications</div>
                        <div className="stat-value text-warning text-3xl">{applications.length}</div>
                        <div className="stat-desc">Total job requests</div>
                    </div>
                </div>
            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. User Distribution Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaUsers className="text-primary" /> User Distribution
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userRoleData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {userRoleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Platform Activity Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaLayerGroup className="text-secondary" /> Platform Activity
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
                                    {activityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Revenue Area Chart (Full Width) */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaMoneyBillWave className="text-success" /> Revenue Trend
                    </h3>
                    <div className="h-[300px] w-full">
                        {revenueChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueChartData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#36D399" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#36D399" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area 
                                        type="monotone" 
                                        dataKey="amount" 
                                        stroke="#36D399" 
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <FaMoneyBillWave className="text-4xl mb-2 opacity-20"/>
                                <p>No revenue data available yet</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminOverview;