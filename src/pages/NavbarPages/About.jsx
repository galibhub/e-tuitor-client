import React from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you use react-router
import eduImg from "../../assets/illustration.jpg";

const About = () => {
  // Animation Variants for Staggered Effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the appearance of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-base-200 py-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering Education with{" "}
                <span className="text-primary">eTuitionBd</span>
              </h1>
              <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                We are bridging the gap between ambitious students and expert
                tutors. Experience a platform designed for trust, transparency,
                and academic success.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
                <Link to="/tutors" className="btn btn-outline btn-primary">
                  Find a Tutor
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual/Image */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl p-1 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-base-100 rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center border border-base-300">
                  {/* ✅ Replace with actual image */}
                  <img
                    src={eduImg}
                    alt="Education Illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MISSION & STATS --- */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Mission Text */}
            <motion.div variants={itemVariants}>
              <div className="badge badge-secondary badge-outline mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Making Quality Education Accessible to All
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed mb-6">
                Our mission is to build a trusted digital bridge between
                students and tutors. We replace chaotic searches with structured
                workflows, ensuring students focus on learning and tutors focus
                on teaching.
              </p>
              <ul className="space-y-3">
                {[
                  "Verified Tutors",
                  "Secure Payments",
                  "Progress Tracking",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-medium">
                    <FaCheckCircle className="text-success" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {[
                {
                  label: "Students Helped",
                  val: "1,200+",
                  color: "bg-primary/10 text-primary",
                },
                {
                  label: "Verified Tutors",
                  val: "800+",
                  color: "bg-secondary/10 text-secondary",
                },
                {
                  label: "Success Rate",
                  val: "98%",
                  color: "bg-accent/10 text-accent",
                },
                {
                  label: "Active Tuitions",
                  val: "450+",
                  color: "bg-info/10 text-info",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className={`p-6 rounded-2xl border border-base-200 text-center ${stat.color} bg-opacity-20`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-3xl font-bold mb-1">{stat.val}</h3>
                  <p className="text-sm opacity-80 font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- KEY FEATURES --- */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose eTuitionBd?
            </h2>
            <p className="text-base-content/60">
              We provide the tools you need to succeed, whether you are teaching
              or learning.
            </p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {[
              {
                icon: FaUserGraduate,
                title: "Student-Friendly",
                desc: "Easy dashboard to manage posts and approvals.",
                color: "text-primary",
              },
              {
                icon: FaChalkboardTeacher,
                title: "Tutor-Centric",
                desc: "Apply to jobs and track revenue effortlessly.",
                color: "text-secondary",
              },
              {
                icon: FaShieldAlt,
                title: "Secure & Safe",
                desc: "Verified profiles and secure data handling.",
                color: "text-accent",
              },
              {
                icon: FaClock,
                title: "Time-Saving",
                desc: "Automated matching saves you hours of searching.",
                color: "text-info",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200 hover:border-primary/30 transition-colors"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <feature.icon className={`text-4xl mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-base-content/60 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CALL TO ACTION (CTA) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-primary text-primary-content rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of students and tutors who are already
                transforming their educational experience with eTuitionBd.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/register"
                  className="btn btn-secondary btn-lg border-none shadow-lg hover:scale-105 transition-transform"
                >
                  Register as Student
                </Link>
                <Link
                  to="/login"
                  className="btn bg-white text-primary btn-lg border-none shadow-lg hover:scale-105 transition-transform hover:bg-gray-100"
                >
                  Register as Tutor
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
