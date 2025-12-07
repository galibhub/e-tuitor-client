import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2"; // Ensure you have this installed

const Contact = () => {
  
  // Handle form submission (Simulated)
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Simulate API call
    Swal.fire({
      title: 'Message Sent!',
      text: 'We have received your message and will get back to you soon.',
      icon: 'success',
      confirmButtonText: 'Great'
    });
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-100 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-base-200 py-20">
        {/* Background Blobs for consistency */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p
            className="text-lg text-base-content/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have a question about finding a tutor? Need support? 
            We are here to help you 24/7.
          </motion.p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="container mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Contact Form */}
          <motion.div
            className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl border border-base-200 p-8 md:p-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-primary" /> Send us a Message
            </h2>
            
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Name</span>
                  </label>
                  <input type="text" placeholder="John Doe" className="input input-bordered w-full focus:input-primary transition-all" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Email</span>
                  </label>
                  <input type="email" placeholder="john@example.com" className="input input-bordered w-full focus:input-primary transition-all" required />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Subject</span>
                </label>
                <input type="text" placeholder="e.g. Tuition Inquiry" className="input input-bordered w-full focus:input-primary transition-all" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32 w-full focus:textarea-primary transition-all" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full md:w-auto md:px-10">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* RIGHT: Contact Info & Map */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Details Cards */}
            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold mb-4 text-primary">Contact Information</h3>
              <div className="space-y-4">
                
                <div className="flex items-start gap-4 p-3 bg-base-100 rounded-xl shadow-sm">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-bold uppercase">Email Us</p>
                    <p className="font-medium text-sm md:text-base">support@etuitionbd.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-base-100 rounded-xl shadow-sm">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-bold uppercase">Call Us</p>
                    <p className="font-medium text-sm md:text-base">+880 1700-000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-base-100 rounded-xl shadow-sm">
                  <div className="p-3 bg-accent/10 text-accent rounded-lg">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-bold uppercase">Visit Us</p>
                    <p className="font-medium text-sm md:text-base">Mirpur 10, Dhaka, Bangladesh</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-base-200 h-64 relative">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.582336034916!2d90.36866177607787!3d23.79791118695277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2sMirpur-10%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1701234567890!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;