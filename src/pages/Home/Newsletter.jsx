import React from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        
        {/* Main Card: Soft Gray instead of Heavy Gradient */}
        <div className="relative bg-base-200/60 border border-base-300 rounded-3xl p-10 md:p-16 overflow-hidden text-center max-w-5xl mx-auto">
          
          {/* Subtle Background Pattern (Optional) */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Icon Circle */}
            <div className="inline-block p-4 bg-base-100 rounded-full mb-6 shadow-sm border border-base-200">
              <FaEnvelope className="text-3xl text-primary" />
            </div>
            
            {/* Headlines (Dark Text for White Theme) */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-base-content">
              Subscribe to Our <span className="text-primary">Newsletter</span>
            </h2>
            <p className="mb-8 text-base-content/70 text-lg font-medium leading-relaxed">
              Get the latest tuition updates, tutor tips, and platform news delivered directly to your inbox. No spam, we promise!
            </p>

            {/* Input Group */}
            <form className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-lg w-full bg-base-100 text-base-content border border-base-300 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                required
              />
              <button className="btn btn-lg btn-primary text-white rounded-full px-8 shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Subscribe <FaPaperPlane className="text-xs" />
              </button>
            </form>
            
            <p className="text-xs text-base-content/50 mt-5 font-medium tracking-wide">
              🔒 Your email is safe with us. Join 5,000+ subscribers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;