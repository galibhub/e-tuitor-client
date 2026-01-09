import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Ahmed",
      role: "Student",
      image: "https://i.pravatar.cc/150?img=11", // Random placeholder
      feedback:
        "eTuitionBd helped me find a qualified tutor within 2 days. The verification process gave me peace of mind. Very smooth experience!",
    },
    {
      id: 2,
      name: "Sadia Islam",
      role: "Professional Tutor",
      image: "https://i.pravatar.cc/150?img=5", // Random placeholder
      feedback:
        "I got regular tuition jobs and secure payments through this platform. It's much better than facebook groups. Highly recommended platform.",
    },
    {
      id: 3,
      name: "Imran Hossain",
      role: "Parent",
      image: "https://i.pravatar.cc/150?img=3", // Random placeholder
      feedback:
        "The Admin verification system makes this platform trustworthy. I found a great math tutor for my son who is very punctual.",
    },
  ];

  return (
    <section className="py-20 bg-base-200/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            What Our Users <span className="text-primary">Say</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full opacity-80"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
            >
              <div className="card-body relative p-8">
                {/* Decorative Quote Icon */}
                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-primary/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-4 text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-base-content/70 italic leading-relaxed mb-6 relative z-10">
                  "{item.feedback}"
                </p>

                {/* Divider */}
                <div className="divider my-0 mb-4 opacity-50"></div>

                {/* User Profile */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        onError={(e) => e.target.src = "https://i.ibb.co/WchFhLg/user.png"}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content text-lg">
                      {item.name}
                    </h4>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;