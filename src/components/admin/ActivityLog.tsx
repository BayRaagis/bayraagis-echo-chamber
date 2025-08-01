
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Activity {
  id: string;
  admin_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  created_at: string;
  admin_email?: string;
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Use the edge function to get admin activity
        const { data, error } = await supabase.functions.invoke('get-admin-activity');

        if (error) {
          console.error("Error fetching activities:", error);
          return;
        }

        setActivities(data || []);
      } catch (error) {
        console.error("Error in activity fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading activity log...</div>;
  }

  if (activities.length === 0) {
    return <div className="text-center py-8">No activities recorded yet.</div>;
  }

  const formatActionType = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderEntityType = (entityType: string) => {
    return entityType.charAt(0).toUpperCase() + entityType.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Recent Admin Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(activity.created_at), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell>{activity.admin_email || "Unknown"}</TableCell>
                <TableCell>{formatActionType(activity.action_type)}</TableCell>
                <TableCell>{renderEntityType(activity.entity_type)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {activity.details ? JSON.stringify(activity.details) : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActivityLog;
