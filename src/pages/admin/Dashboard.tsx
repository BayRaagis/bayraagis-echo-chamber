
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ActivityLog from "@/components/admin/ActivityLog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { isLoading, isAdmin } = useAuth();
  const [counts, setCounts] = useState({
    artists: 0,
    events: 0,
    performances: 0,
    contactSubmissions: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Count artists
        const { count: artistCount, error: artistError } = await supabase
          .from('artists')
          .select('*', { count: 'exact', head: true });
          
        // Count events  
        const { count: eventCount, error: eventError } = await supabase
          .from('events')
          .select('*', { count: 'exact', head: true });
          
        // Count performances
        const { count: performanceCount, error: performanceError } = await supabase
          .from('performances')
          .select('*', { count: 'exact', head: true });
          
        // Count contact submissions
        const { count: contactCount, error: contactError } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true });
          
        setCounts({
          artists: artistCount || 0,
          events: eventCount || 0,
          performances: performanceCount || 0,
          contactSubmissions: contactCount || 0
        });
        
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    
    fetchCounts();
  }, []);

  // Redirect to login if not logged in or not an admin
  if (!isLoading && !isAdmin) {
    return <Navigate to="/admin/login" />;
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Artists</CardTitle>
            <CardDescription>Total number of artists</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.artists}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Events</CardTitle>
            <CardDescription>Upcoming and past events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.events}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performances</CardTitle>
            <CardDescription>Total performances</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.performances}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Contact Submissions</CardTitle>
            <CardDescription>Inquiries from visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{counts.contactSubmissions}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <ActivityLog />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
