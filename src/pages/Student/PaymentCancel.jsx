import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-error mb-3">
          Payment Cancelled
        </h2>
        <p className="text-sm text-base-content/70 mb-6">
          Your payment was cancelled. You can try again anytime.
        </p>
        <Link to="/dashboard/applied-tutors" className="btn btn-primary w-full">
          Back to Applied Tutors
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
