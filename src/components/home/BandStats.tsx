
const BandStats = () => {
  // These would come from the database in a real application
  const stats = {
    totalShows: "30+",
    uniquePerformers: "99+",
    hoursPerformed: "50+"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-accent rounded-lg shadow-md">
      <div className="flex flex-col items-center p-4 bg-background rounded-md shadow-sm">
        <span className="text-4xl font-bold text-primary">{stats.totalShows}</span>
        <span className="text-muted-foreground mt-2">Shows Performed</span>
      </div>
      
      <div className="flex flex-col items-center p-4 bg-background rounded-md shadow-sm">
        <span className="text-4xl font-bold text-primary">{stats.uniquePerformers}</span>
        <span className="text-muted-foreground mt-2">Unique Performers</span>
      </div>
      
      <div className="flex flex-col items-center p-4 bg-background rounded-md shadow-sm">
        <span className="text-4xl font-bold text-primary">{stats.hoursPerformed}</span>
        <span className="text-muted-foreground mt-2">Hours of Music</span>
      </div>
    </div>
  );
};

export default BandStats;
