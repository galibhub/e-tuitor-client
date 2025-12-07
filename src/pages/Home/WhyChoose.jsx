import React from "react";
import { FaShieldAlt, FaUsers, FaStar, FaClock } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Verified Tutors",
      desc: "We ensure every tutor is verified for safe learning experience.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-4xl text-secondary" />,
      title: "Secure Platform",
      desc: "Your data and interactions are protected with strong security.",
    },
    {
      id: 3,
      icon: <FaStar className="text-4xl text-accent" />,
      title: "Quality Matching",
      desc: "Students get matched with the best tutors based on their needs.",
    },
    {
      id: 4,
      icon: <FaClock className="text-4xl text-primary" />,
      title: "Fast Process",
      desc: "Easy posting, quick approval, and fast tutor applications.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Why Choose <span className="text-primary">eTuitionBd</span>?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-base-100 border border-base-300 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-base-content/70">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
