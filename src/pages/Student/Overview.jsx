import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBookOpen, FaMoneyBillWave, FaFileSignature, FaChalkboardTeacher } from 'react-icons/fa';

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // 1. Fetch My Posted Tuitions
    const { data: myTuitions = [] } = useQuery({
        queryKey: ['myTuitions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tutions?studentEmail=${user.email}`);
            return res.data;
        }
    });

    // 2. Fetch My Payments (Spending)
    const { data: myPayments = [] } = useQuery({
        queryKey: ['myPayments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/student?email=${user.email}`);
            return res.data;
        }
    });

    // 3. Fetch Applications received on my posts
    const { data: myApplications = [] } = useQuery({
        queryKey: ['myApplications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?studentEmail=${user.email}`);
            return res.data;
        }
    });

    // --- DATA PROCESSING FOR CHARTS ---

    // Calculate Total Spent
    const totalSpent = myPayments.reduce((total, item) => total + item.amount, 0);

    // Chart Data 1: Subject Distribution (Pie Chart)
    // Counts how many tuitions posted per subject
    const subjectStats = myTuitions.reduce((acc, curr) => {
        const subject = curr.subject || "Other";
        const existing = acc.find(item => item.name === subject);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: subject, value: 1 });
        }
        return acc;
    }, []);

    // Chart Data 2: Spending History (Area Chart)
    // Formats payment dates to show spending over time
    const spendingData = myPayments.map(payment => ({
        date: new Date(payment.createdAt).toLocaleDateString(),
        amount: payment.amount
    })).reverse(); // Reverse to show oldest to newest

    // Colors for Pie Chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="p-4 md:p-8 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">Student Dashboard Overview</h2>

            {/* --- STATS CARDS SECTION --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                
                {/* Card 1: Total Posts */}
                <div className="stat bg-white shadow-lg rounded-2xl border-l-4 border-primary">
                    <div className="stat-figure text-primary">
                        <FaBookOpen className="text-3xl" />
                    </div>
                    <div className="stat-title font-semibold">Tuitions Posted</div>
                    <div className="stat-value text-primary">{myTuitions.length}</div>
                    <div className="stat-desc">Total posts active/pending</div>
                </div>

                {/* Card 2: Total Spent */}
                <div className="stat bg-white shadow-lg rounded-2xl border-l-4 border-secondary">
                    <div className="stat-figure text-secondary">
                        <FaMoneyBillWave className="text-3xl" />
                    </div>
                    <div className="stat-title font-semibold">Total Spent</div>
                    <div className="stat-value text-secondary">৳{totalSpent}</div>
                    <div className="stat-desc">Lifetime expenditure</div>
                </div>

                {/* Card 3: Applications Received */}
                <div className="stat bg-white shadow-lg rounded-2xl border-l-4 border-accent">
                    <div className="stat-figure text-accent">
                        <FaFileSignature className="text-3xl" />
                    </div>
                    <div className="stat-title font-semibold">Applications</div>
                    <div className="stat-value text-accent">{myApplications.length}</div>
                    <div className="stat-desc">Received from tutors</div>
                </div>

                {/* Card 4: Active Tutors (Approved Apps) */}
                <div className="stat bg-white shadow-lg rounded-2xl border-l-4 border-info">
                    <div className="stat-figure text-info">
                        <FaChalkboardTeacher className="text-3xl" />
                    </div>
                    <div className="stat-title font-semibold">Hired Tutors</div>
                    <div className="stat-value text-info">
                        {myApplications.filter(app => app.status === 'approved').length}
                    </div>
                    <div className="stat-desc">Successfully hired</div>
                </div>
            </div>

            {/* --- CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart 1: Spending History */}
                <div className="bg-white p-6 shadow-xl rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Spending History</h3>
                    <div className="h-[300px]">
                        {spendingData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={spendingData}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="flex justify-center items-center h-full text-gray-400">No payment data available</p>
                        )}
                    </div>
                </div>

                {/* Chart 2: Tuition Subjects Distribution */}
                <div className="bg-white p-6 shadow-xl rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">My Tuition Requirements</h3>
                    <div className="h-[300px]">
                        {subjectStats.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={subjectStats}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {subjectStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="flex justify-center items-center h-full text-gray-400">No tuition posts found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;