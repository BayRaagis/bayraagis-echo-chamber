
import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">BayRaagis</h1>
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Home
            </Link>
            <Link to="/artists" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Artist Directory
            </Link>
            <Link to="/performances" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Past Performances
            </Link>
            <Link to="/events" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Upcoming Events
            </Link>
            <Link to="/testimonials" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Testimonials
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
