
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ActivityLog from "@/components/admin/ActivityLog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Counts used to come from Supabase tables. Until a backend is wired up there is
// nothing to count, so the cards render as placeholders. See AuthContext for context.
const stats = [
  { title: "Artists", description: "Total number of artists" },
  { title: "Events", description: "Upcoming and past events" },
  { title: "Performances", description: "Total performances" },
  { title: "Contact Submissions", description: "Inquiries from visitors" },
];

const AdminDashboard = () => {
  const { isLoading, isAdmin } = useAuth();

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
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-muted-foreground">&mdash;</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <ActivityLog />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
