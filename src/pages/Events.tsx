
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Events = () => {
  // This would be populated from a database in a real application
  const events = [
    {
      id: 1,
      title: "BayRaagis Summer Fusion",
      date: "August 15, 2024",
      time: "7:00 PM",
      location: "Bay Area Community Center",
      image: "/placeholder.svg",
      ticketUrl: "https://eventbrite.com/",
      googleCalendarUrl: "https://calendar.google.com/",
      outlookCalendarUrl: "https://outlook.office.com/calendar/",
      stripePaymentUrl: "https://stripe.com/"
    },
    {
      id: 2,
      title: "Classical Meets Jazz",
      date: "September 23, 2024",
      time: "6:30 PM",
      location: "Stanford Arts Center",
      image: "/placeholder.svg",
      ticketUrl: "https://eventbrite.com/",
      googleCalendarUrl: "https://calendar.google.com/",
      outlookCalendarUrl: "https://outlook.office.com/calendar/",
      stripePaymentUrl: "https://stripe.com/"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map(event => (
            <div key={event.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-1">Date: {event.date}</p>
                <p className="text-muted-foreground mb-1">Time: {event.time}</p>
                <p className="text-muted-foreground mb-4">Location: {event.location}</p>
                
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                      RSVP / Buy Tickets
                    </a>
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={event.googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                        Google Calendar
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={event.outlookCalendarUrl} target="_blank" rel="noopener noreferrer">
                        Outlook Calendar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
