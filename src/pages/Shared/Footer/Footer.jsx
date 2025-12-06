import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ABOUT SECTION */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            e<span className="text-primary">Tuition</span>Bd
          </h2>
          <p className="text-sm leading-6">
            eTuitionBd is a smart platform connecting students and tutors 
            across Bangladesh. Find verified tutors, manage tuitions, 
            track applications, and enjoy seamless online learning.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/tuitions" className="link link-hover">Tuitions</Link></li>
            <li><Link to="/tutors" className="link link-hover">Tutors</Link></li>
            <li><Link to="/about" className="link link-hover">About Us</Link></li>
            <li><Link to="/contact" className="link link-hover">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <p className="text-sm mb-2">📍 Dhaka, Bangladesh</p>
          <p className="text-sm mb-2">📞 +880 1234-567890</p>
          <p className="text-sm">📧 support@etuitionbd.com</p>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-primary transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
            <a href="#" className="hover:text-primary transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-primary transition"><FaXTwitter /></a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT SECTION */}
      <div className="bg-base-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} eTuitionBd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
