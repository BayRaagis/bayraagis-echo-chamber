
import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Home, Users, Calendar, Music, MessageSquare, Settings, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title = "Dashboard" }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-primary text-primary-foreground transition-all ${sidebarOpen ? 'w-64' : 'w-20'} min-h-screen`}>
        <div className="p-4 flex justify-between items-center">
          {sidebarOpen ? (
            <h1 className="font-bold text-xl">BayRaagis Admin</h1>
          ) : (
            <span className="font-bold text-xl">BR</span>
          )}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
          </Button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-primary/90">
                <Home className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/artists" className="flex items-center p-4 hover:bg-primary/90">
                <Users className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Artists</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/events" className="flex items-center p-4 hover:bg-primary/90">
                <Calendar className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Events</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/performances" className="flex items-center p-4 hover:bg-primary/90">
                <Music className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Performances</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/testimonials" className="flex items-center p-4 hover:bg-primary/90">
                <MessageSquare className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Testimonials</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center p-4 hover:bg-primary/90">
                <Settings className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-4 w-full">
            <button 
              onClick={handleLogout}
              className="flex items-center p-4 hover:bg-primary/90 w-full"
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
