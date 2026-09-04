
// The activity feed was backed by a Supabase edge function that has been removed.
// Kept as a placeholder so the admin shell still lays out correctly.
const ActivityLog = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b">
      <h3 className="text-lg font-medium">Recent Admin Activity</h3>
    </div>
    <div className="text-center py-8 text-muted-foreground">
      No activity source is configured.
    </div>
  </div>
);

export default ActivityLog;
