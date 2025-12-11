import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  return (
    // bg-gray-100 gives that "not fully white" look
    <footer className="bg-gray-100 text-gray-700 mt-16 font-sans border-t border-gray-200">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* BRAND & ABOUT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            e<span className="text-blue-600">Tuition</span>Bd
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Empowering students and tutors across Bangladesh. 
            Connect, learn, and grow with the most trusted 
            tuition platform in the country.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 pt-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaXTwitter />, link: "#" },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                // Changed to white bg for contrast against the gray footer
                className="bg-white p-3 rounded-full text-gray-600 shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b-2 border-blue-500 inline-block pb-1">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["Home", "Tuitions", "Tutors", "About Us", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  to={`/${item.toLowerCase().replace(" ", "")}`} 
                  className="hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <span className="text-blue-500">›</span> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b-2 border-blue-500 inline-block pb-1">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faq" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Become a Tutor</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b-2 border-blue-500 inline-block pb-1">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to get the latest tuition updates and offers.
          </p>
          <div className="flex flex-col gap-3">
            <div className="relative">
              {/* Input changed to White background with a border */}
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
              />
              <button className="absolute right-2 top-2 bg-blue-600 p-1.5 rounded-md text-white hover:bg-blue-700 transition shadow-md">
                <FiSend />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📍 Dhaka, Bangladesh | 📞 +880 1234-567890
            </p>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      {/* Slightly darker gray (gray-200) to separate it from the main footer */}
      <div className="bg-gray-200 py-6 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} eTuitionBd. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link to="#" className="hover:text-blue-600 transition">Privacy</Link>
            <Link to="#" className="hover:text-blue-600 transition">Terms</Link>
            <Link to="#" className="hover:text-blue-600 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;