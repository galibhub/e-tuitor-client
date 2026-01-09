import React from "react";
import { FaUserPlus, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const PlatformWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-4xl text-primary" />,
      title: "Register & Create Profile",
      desc: "Students and tutors create their profiles within seconds.",
    },
    {
      id: 2,
      icon: <FaClipboardList className="text-4xl text-secondary" />,
      title: "Post or Apply for Tuitions",
      desc: "Students post tuition needs while tutors apply with details.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-4xl text-accent" />,
      title: "Get Matched & Start Learning",
      desc: "Admins approve posts, students choose tutors, and classes begin.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        How the Platform <span className="text-primary">Works</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-base-100 shadow-lg hover:shadow-xl transition-shadow p-8 rounded-lg border border-base-300 text-center"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-base-content/70">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformWorks;
