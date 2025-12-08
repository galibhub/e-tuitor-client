import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { id } = useParams(); // application _id
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // 1) Application data load
  const { data: application, isLoading } = useQuery({
    queryKey: ["applicationForPayment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${id}`);
      return res.data;
    },
  });

  // 2) Handle payment button
  const handlePayment = async () => {
    try {
      if (!application) return;

      const paymentInfo = {
        applicationId: application._id,
        amount: Number(application.expectedSalary),
        tutorEmail: application.tutorEmail,
        studentEmail: application.studentEmail,
        tuitionTitle: application.tuitionTitle,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      // Stripe checkout page e redirect
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      alert("Payment session create korte problem hosse. Try again.");
    }
  };

  if (isLoading || !application) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-base-100 rounded-2xl shadow-lg border border-base-200 p-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Payment for Tutor</h2>

      <div className="space-y-2 mb-6">
        <p>
          <span className="font-semibold">Tuition:</span>{" "}
          {application.tuitionTitle}
        </p>
        <p>
          <span className="font-semibold">Tutor:</span>{" "}
          {application.tutorName} ({application.tutorEmail})
        </p>
        <p>
          <span className="font-semibold">Expected Monthly Salary:</span>{" "}
          <span className="text-success font-bold">
            ৳{application.expectedSalary}
          </span>
        </p>
        <p className="text-xs text-base-content/60">
          You are about to pay this amount via Stripe. After successful
          payment, the tutor will be marked as <b>Approved</b>.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePayment}
          className="btn btn-primary flex-1"
        >
          Pay ৳{application.expectedSalary} and Approve Tutor
        </button>

        <button
          type="button"
          onClick={() => navigate("/payment/cancel")}
          className="btn btn-outline flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;
