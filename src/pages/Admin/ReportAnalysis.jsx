import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportAnalysis = () => {
  const axiosSecure = useAxiosSecure();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- PAGINATION STATE (NEW) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Showing 5 rows per page

  // Load report data
  const fetchReport = async () => {
    try {
      const res = await axiosSecure.get("/admin/reports");
      setReport(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Report",
        text: "Please refresh the page or check the server.",
      });
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // --- PAGINATION CALCULATION (NEW) ---
  // Safely get the array (or empty array if report is null)
  const allPayments = report?.payments || [];
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Slice the data for the current page
  const currentPayments = allPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allPayments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Reports & Analytics
      </h1>

      {/* Cards Grid (Summary uses TOTAL data, unaffected by pagination) */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Earnings */}
        <div className="p-6 shadow-xl rounded-xl bg-base-100 border border-base-300 hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold mb-1">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-600">
            ৳ {report?.totalEarnings}
          </p>
        </div>

        {/* Total Transactions */}
        <div className="p-6 shadow-xl rounded-xl bg-base-100 border border-base-300 hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold mb-1">Total Transactions</h2>
          <p className="text-3xl font-bold text-primary">
            {report?.totalTransactions}
          </p>
        </div>

        {/* Average Transaction Amount */}
        <div className="p-6 shadow-xl rounded-xl bg-base-100 border border-base-300 hover:scale-[1.02] transition">
          <h2 className="text-lg font-semibold mb-1">Avg. Transaction Amount</h2>
          <p className="text-3xl font-bold text-secondary">
            ৳ {Math.round(report?.totalEarnings / report?.totalTransactions || 0)}
          </p>
        </div>
      </div>

      {/* Payment History Table */}
      <h2 className="text-xl font-bold mb-3">All Payment History</h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-300">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Transaction ID</th>
              <th>Student Email</th>
              <th>Tutor Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          {/* Map over currentPayments instead of report.payments */}
          <tbody>
            {currentPayments.map((pay) => (
              <tr key={pay._id} className="hover">
                <td className="font-mono text-xs">{pay.transactionId}</td>
                <td>{pay.studentEmail}</td>
                <td>{pay.tutorEmail}</td>
                <td className="font-semibold text-primary">৳ {pay.amount}</td>
                <td>{new Date(pay.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- PAGINATION CONTROLS (NEW) --- */}
        {allPayments.length > itemsPerPage && (
          <div className="p-4 flex justify-center border-t border-base-200">
            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`join-item btn btn-sm ${
                    currentPage === i + 1 ? "btn-active btn-primary" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
        {/* --- END CONTROLS --- */}
      </div>
    </div>
  );
};

export default ReportAnalysis;