
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { pastEvents, upcomingEvents } from "@/utils/eventsData";

import { useEffect } from "react";

type Props = {
  url: string;
};

function InstagramEmbed({ url }: Props) {
  useEffect(() => {
    // Dynamically load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: "0",
        margin: "1px",
        padding: "0",
        width: "100%",
      }}
    ></blockquote>
  );
}

const Events = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <section>
          <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {upcomingEvents.length === 0 && (
              <p className="text-center col-span-3">Stay tuned!</p>
            )}
            <div className="h-24"></div>
            {upcomingEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-2">Date: {event.date}</p>
                <Button asChild className="mb-4">
                  <a href={event.rsvp} target="_blank" rel="noopener noreferrer">
                    RSVP
                  </a>
                </Button>
                <InstagramEmbed url={event.link} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Past Events</h1>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {pastEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-2">Date: {event.date}</p>
                <InstagramEmbed url={event.link}/>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Events;
