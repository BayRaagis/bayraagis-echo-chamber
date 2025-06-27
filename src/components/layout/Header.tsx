
import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary/90 to-accent/90 shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/bayraagis-logo.png" 
                alt="BayRaagis Logo" 
                className="h-16 w-auto"
              />
              <h1 className="text-2xl font-bold text-white">BayRaagis</h1>
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link to="/" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Home
            </Link>
            <Link to="/artists" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Artist Directory
            </Link>
            <Link to="/performances" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Past Performances
            </Link>
            <Link to="/events" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Upcoming Events
            </Link>
            <Link to="/testimonials" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Testimonials
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="mt-4 md:mt-0 md:ml-4 flex gap-4">
            <a 
              href="https://www.instagram.com/bayraagis/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Instagram />
            </a>
            <a 
              href="https://www.youtube.com/@Bayraagis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
