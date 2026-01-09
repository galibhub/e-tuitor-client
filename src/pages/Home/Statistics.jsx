import React from "react";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaHandshake, 
  FaBookOpen 
} from "react-icons/fa";

const Statistics = () => {
  const stats = [
    { 
      id: 1, 
      title: "Total Tuitions", 
      value: "1.2k+", 
      icon: <FaBookOpen className="text-3xl" />,
      desc: "Posted Requirements"
    },
    { 
      id: 2, 
      title: "Verified Tutors", 
      value: "850+", 
      icon: <FaChalkboardTeacher className="text-3xl" />,
      desc: "Expert Teachers"
    },
    { 
      id: 3, 
      title: "Happy Students", 
      value: "15k+", 
      icon: <FaUserGraduate className="text-3xl" />,
      desc: "Improved Grades"
    },
    { 
      id: 4, 
      title: "Successful Hires", 
      value: "100%", 
      icon: <FaHandshake className="text-3xl" />,
      desc: "Satisfaction Rate"
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight mb-3">
              Our Platform <span className="text-primary">Impact</span>
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto font-medium">
              Connecting learners with the best educators nationwide through transparent and verified metrics.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div 
              key={item.id} 
              className="card bg-base-100 shadow-xl shadow-base-200/50 border border-base-200 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="card-body items-center text-center p-8">
                
                {/* Icon Circle - Animated on Hover */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                
                {/* Big Number Font */}
                <h3 className="text-5xl font-extrabold text-base-content tracking-tight mb-2">
                  {item.value}
                </h3>
                
                {/* Title */}
                <p className="text-lg font-bold text-base-content/80">
                  {item.title}
                </p>
                
                {/* Subtle Description */}
                <p className="text-xs text-base-content/50 uppercase tracking-widest font-semibold mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;