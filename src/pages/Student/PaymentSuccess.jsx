import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    setLoading(true);
    setError("");

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        setPaymentInfo(res.data); // { message, transactionId, trackingId, amount }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Payment update error:", error);
        setError("Could not verify payment. Please contact support if money was deducted.");
        setLoading(false);
      });
  }, [sessionId, axiosSecure]);


  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <p className="text-error font-semibold">
            Invalid payment session. Please try again.
          </p>
          <Link to="/dashboard/applied-tutors" className="btn btn-sm btn-primary mt-4">
            Back to Applied Tutors
          </Link>
        </div>
      </div>
    );
  }

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/70">
            Confirming your payment, please wait...
          </p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-error mb-3">
            Something went wrong
          </h2>
          <p className="text-sm text-base-content/70 mb-4">{error}</p>
          <Link to="/dashboard/applied-tutors" className="btn btn-primary w-full">
            Back to Applied Tutors
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-success mb-3">
          Payment Successful! ✓
        </h2>

        {paymentInfo && (
          <div className="mb-6 space-y-1 text-left">
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              <span className="font-mono text-xs break-all">
                {paymentInfo.transactionId}
              </span>
            </p>

            {paymentInfo.trackingId && (
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                <span className="font-mono text-xs break-all">
                  {paymentInfo.trackingId}
                </span>
              </p>
            )}

            <p>
              <span className="font-semibold">Paid Amount:</span>{" "}
              <span className="font-bold text-success">
                ৳{paymentInfo.amount}
              </span>
            </p>
          </div>
        )}

        <p className="text-sm text-base-content/70 mb-6 text-left">
          The tutor's application has been <span className="font-semibold">approved</span> after
          successful payment. You can now manage this tuition from your dashboard.
        </p>

        <Link to="/dashboard/applied-tutors" className="btn btn-primary w-full">
          Back to Applied Tutors
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
