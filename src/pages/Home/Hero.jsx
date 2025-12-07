import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 md:py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* LEFT SIDE – TEXT */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-primary mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Smart Tuition Platform
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Find Your Perfect{" "}
            <span className="text-primary">Tutor</span> for Every Subject.
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-base-content/70 mb-8 max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            eTuitionBd connects students with verified tutors for personalized,
            flexible, and affordable learning — from school basics to admission
            prep.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/tuitions" className="btn btn-primary btn-md w-full">
                Browse Tuitions
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="btn btn-outline btn-md w-full border-primary text-primary"
              >
                Join as Tutor
              </Link>
            </motion.div>
          </motion.div>

          {/* Small stats */}
          <motion.div
            className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div>
              <p className="font-bold text-base-content">1000+ Tutors</p>
              <p className="text-base-content/60">Verified & experienced</p>
            </div>
            <div>
              <p className="font-bold text-base-content">500+ Tuitions</p>
              <p className="text-base-content/60">Active every month</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE – ILLUSTRATION CARD */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl border border-base-300 p-6 md:p-8 relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

            <h3 className="font-semibold text-lg mb-3">
              Smart Tuition Matching
            </h3>
            <p className="text-sm text-base-content/70 mb-5">
              Post your tuition, receive tutor applications, and approve the
              right tutor with secure payment & transparent tracking.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p>Post tuitions with subject, class, budget & schedule.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <p>Verified tutors apply with experience & expected salary.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <p>Approve after secure payment — everything tracked.</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-base-content/60">
              <span>Real-time updates</span>
              <span>Trusted by students & tutors</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
