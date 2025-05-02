
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">BayRaagis Admin</h1>
          <Button variant="outline" asChild>
            <Link to="/">View Website</Link>
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/artists" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2">Artists</h3>
            <p className="text-muted-foreground">Manage the artist directory</p>
          </Link>
          
          <Link to="/admin/events" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2">Events</h3>
            <p className="text-muted-foreground">Manage upcoming events</p>
          </Link>
          
          <Link to="/admin/performances" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2">Performances</h3>
            <p className="text-muted-foreground">Manage past performances</p>
          </Link>
          
          <Link to="/admin/testimonials" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-2">Testimonials</h3>
            <p className="text-muted-foreground">Approve and manage testimonials</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
