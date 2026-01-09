import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
    FaChalkboardTeacher, 
    FaMoneyBillWave, 
    FaClipboardList, 
    FaCheckCircle 
} from 'react-icons/fa';

const TutorOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 1. Fetch My Applications (To track job status)
    const { data: myApplications = [] } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?tutorEmail=${user.email}`);
            return res.data;
        }
    });

    // 2. Fetch My Payments (Income)
    const { data: myPayments = [] } = useQuery({
        queryKey: ['my-income', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/tutor?email=${user.email}`);
            return res.data;
        }
    });

    // --- DATA PROCESSING FOR CHARTS ---

    // 1. Calculate Total Income
    const totalEarnings = myPayments.reduce((total, item) => total + item.amount, 0);

    // 2. Calculate Stats
    const totalApplied = myApplications.length;
    const hiredJobs = myApplications.filter(app => app.status === 'approved').length;
    const pendingJobs = myApplications.filter(app => app.status === 'pending').length;

    // 3. Chart Data: Application Status (Pie Chart)
    const statusData = [
        { name: 'Approved', value: hiredJobs, color: '#00C49F' }, // Green
        { name: 'Pending', value: pendingJobs, color: '#FFBB28' }, // Yellow
        { name: 'Rejected', value: totalApplied - (hiredJobs + pendingJobs), color: '#FF8042' } // Orange/Red
    ].filter(item => item.value > 0); // Hide zero values

    // 4. Chart Data: Earnings History (Area Chart)
    // We reverse the array to show oldest -> newest dates left to right
    const earningsData = [...myPayments].reverse().map(payment => ({
        date: new Date(payment.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        amount: payment.amount,
        title: payment.tuitionTitle || "Tuition"
    }));

    return (
        <div className="p-6 md:p-8 bg-base-100 min-h-screen space-y-8">
            
            {/* --- HEADER --- */}
            <div>
                <h2 className="text-3xl font-bold text-base-content">Tutor Dashboard</h2>
                <p className="text-sm text-base-content/60">Track your applications, students, and earnings.</p>
            </div>

            {/* --- STATS CARDS SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Total Earnings */}
                <div className="stats shadow-md bg-white border-l-4 border-success overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-success bg-success/10 p-3 rounded-full">
                            <FaMoneyBillWave className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Total Earnings</div>
                        <div className="stat-value text-success text-3xl">৳{totalEarnings}</div>
                        <div className="stat-desc">Lifetime income</div>
                    </div>
                </div>

                {/* Card 2: Total Applications */}
                <div className="stats shadow-md bg-white border-l-4 border-primary overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
                            <FaClipboardList className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Applications</div>
                        <div className="stat-value text-primary text-3xl">{totalApplied}</div>
                        <div className="stat-desc">Tuitions applied for</div>
                    </div>
                </div>

                {/* Card 3: Active Jobs (Hired) */}
                <div className="stats shadow-md bg-white border-l-4 border-info overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-info bg-info/10 p-3 rounded-full">
                            <FaChalkboardTeacher className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Active Jobs</div>
                        <div className="stat-value text-info text-3xl">{hiredJobs}</div>
                        <div className="stat-desc">Approved applications</div>
                    </div>
                </div>

                {/* Card 4: Success Rate */}
                <div className="stats shadow-md bg-white border-l-4 border-warning overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-warning bg-warning/10 p-3 rounded-full">
                            <FaCheckCircle className="text-2xl" />
                        </div>
                        <div className="stat-title font-semibold text-base-content/70">Success Rate</div>
                        <div className="stat-value text-warning text-3xl">
                            {totalApplied > 0 ? ((hiredJobs / totalApplied) * 100).toFixed(0) : 0}%
                        </div>
                        <div className="stat-desc">Hired vs Applied</div>
                    </div>
                </div>
            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart 1: Earnings History */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaMoneyBillWave className="text-success" /> Income History
                    </h3>
                    <div className="h-[300px] w-full">
                        {earningsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={earningsData}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#36D399" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#36D399" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '10px' }}
                                        formatter={(value) => [`৳${value}`, 'Amount']}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="amount" 
                                        stroke="#36D399" 
                                        fillOpacity={1} 
                                        fill="url(#colorIncome)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <p>No earnings yet.</p>
                                
                            </div>
                        )}
                    </div>
                </div>

                {/* Chart 2: Application Status */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaClipboardList className="text-primary" /> Application Status
                    </h3>
                    <div className="h-[300px] w-full">
                        {statusData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <p>No applications found.</p>
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorOverview;