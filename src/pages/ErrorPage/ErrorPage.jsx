// src/pages/ErrorPage.jsx
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  const statusCode = error?.status || 404;
  
  // Custom messages based on status
  const title = statusCode === 404 ? "Lost in Space?" : "System Malfunction";
  const message =
    error?.status === 404
      ? "The page you are looking for has drifted away or doesn't exist."
      : error?.statusText || error?.message || "Something went wrong on our end.";

  return (
    <div className="relative min-h-screen w-full bg-base-200 flex items-center justify-center overflow-hidden selection:bg-primary selection:text-white">
      
      {/* --- 1. Animated Background Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- 2. Main Content Card (Glassmorphism) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full mx-4"
      >
        <div className="bg-base-100/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-center">
          
          {/* Giant Floating Status Code */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-accent drop-shadow-sm select-none">
              {statusCode}
            </h1>
            
            {/* Decorative element behind number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-10 bg-black/10 blur-xl rounded-[100%] rotate-12 -z-10"></div>
          </motion.div>

          {/* Text Content */}
          <div className="mt-4 space-y-4">
            <h2 className="text-3xl font-bold text-base-content">{title}</h2>
            <p className="text-base-content/70 text-lg leading-relaxed">
              {message}
            </p>
            <p className="text-sm text-base-content/40 italic">
              Error Code: {statusCode}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="btn btn-primary btn-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 border-none group"
            >
              <FaHome className="group-hover:animate-pulse" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline btn-lg hover:bg-base-content hover:text-base-100 transition-all duration-300 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>

        </div>
      </motion.div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-center w-full text-base-content/30 text-xs">
        &copy; {new Date().getFullYear()} eTuitionBd. All rights reserved.
      </div>
    </div>
  );
};

export default ErrorPage;