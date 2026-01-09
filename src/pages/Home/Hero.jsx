import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaChalkboardTeacher, 
  FaUserCheck, 
  FaBookOpen, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaStar 
} from "react-icons/fa";


const Hero = () => {
  return (
    <section className="relative bg-base-100 py-20 lg:py-28 overflow-hidden">
      
      {/* --- Background Decorative Elements (Soft Glows) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        
        {/* --- LEFT SIDE: CONTENT --- */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FaStar className="text-sm" /> Smart Tuition Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-base-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find Your Perfect <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Tutor
            </span>{" "}
            for Every Subject.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-base-content/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            eTuitionBd connects students with verified tutors for personalized,
            flexible, and affordable learning — from school basics to admission
            prep.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/tuitions" className="btn btn-primary btn-lg w-full sm:w-auto shadow-lg shadow-primary/20 gap-3">
                <FaSearch /> Browse Tuitions
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="btn btn-outline btn-lg w-full sm:w-auto hover:bg-base-content hover:text-base-100 gap-3"
              >
                <FaChalkboardTeacher /> Join as Tutor
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-base-content/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-base-200 rounded-lg text-primary">
                <FaUserCheck className="text-xl" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-base-content">1000+</p>
                <p className="text-xs text-base-content/60 font-medium uppercase">Verified Tutors</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-base-200 rounded-lg text-secondary">
                <FaBookOpen className="text-xl" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-base-content">500+</p>
                <p className="text-xs text-base-content/60 font-medium uppercase">Active Tuitions</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: FEATURE CARD --- */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-full max-w-md bg-base-100/80 backdrop-blur-xl border border-base-200 shadow-2xl rounded-3xl p-8 relative"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white text-xl shadow-lg shadow-primary/30">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="font-bold text-xl text-base-content">Smart Matching</h3>
                <p className="text-xs text-base-content/60">Secure & Verified Platform</p>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                <FaCheckCircle className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-base-content">Post Requirements</p>
                  <p className="text-xs text-base-content/60 mt-0.5">Define subject, class, budget & schedule.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                <FaCheckCircle className="text-secondary text-xl mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-base-content">Verified Tutors</p>
                  <p className="text-xs text-base-content/60 mt-0.5">Get applications from experienced teachers.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                <FaCheckCircle className="text-accent text-xl mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-base-content">Secure Process</p>
                  <p className="text-xs text-base-content/60 mt-0.5">Transparent tracking & payment system.</p>
                </div>
              </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-6 pt-4 border-t border-base-content/10 flex justify-between items-center text-xs font-medium text-base-content/50">
              <span>Trust & Safety First</span>
              <span>Updated Real-time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
    </section>
    
  );
};

export default Hero;