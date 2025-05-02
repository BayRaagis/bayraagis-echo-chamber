
import Layout from "@/components/layout/Layout";

const Performances = () => {
  // This would be populated from a database in a real application
  const performances = [
    {
      id: 1,
      title: "Fusion Night",
      date: "June 12, 2024",
      venue: "San Francisco Cultural Center",
      description: "A magical night of Indian classical fusion with jazz elements.",
      image: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Rhythms of India",
      date: "May 8, 2024",
      venue: "Palo Alto Performing Arts",
      description: "Traditional ragas with contemporary instrumentation created a unique soundscape.",
      image: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Spring Melodies",
      date: "April 22, 2024",
      venue: "Berkeley Music Hall",
      description: "A celebration of spring through music that transcends cultural boundaries.",
      image: "/placeholder.svg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Past Performances</h1>
        
        <div className="space-y-12">
          {performances.map(performance => (
            <div key={performance.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{performance.title}</h3>
                  <p className="text-muted-foreground mb-1">Date: {performance.date}</p>
                  <p className="text-muted-foreground mb-4">Venue: {performance.venue}</p>
                  <p className="mb-4">{performance.description}</p>
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={performance.videoUrl} 
                    title={performance.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Performances;
