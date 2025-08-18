
import { Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-secondary/90 to-primary/90 text-white mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={`${import.meta.env.BASE_URL}assets/bayraagis-logo.png`}
                alt="BayRaagis Logo" 
                className="h-10 w-auto"
              />
              <h3 className="text-xl font-bold">BayRaagis</h3>
            </div>
            <p className="mb-4">An Indian Classical Fusion Music Collective</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/artists" className="hover:underline">Artist Directory</Link>
              <Link to="/performances" className="hover:underline">Past Performances</Link>
              <Link to="/events" className="hover:underline">Upcoming Events</Link>
              <Link to="/testimonials" className="hover:underline">Testimonials</Link>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/bayraagis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <Instagram />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.youtube.com/@Bayraagis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <Youtube />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="mb-2">© {new Date().getFullYear()} BayRaagis. All rights reserved.</p>
          <p className="text-sm opacity-70">
            <Link to="/admin/login" className="hover:underline">Admin Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
