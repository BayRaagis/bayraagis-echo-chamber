
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/use-toast";

const testimonialSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  quote: z.string().min(10, { message: "Testimonial must be at least 10 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." })
});

const Testimonials = () => {
  // This would be populated from a database in a real application
  const testimonials = [
    {
      id: 1,
      quote: "It was a great show! So much genuinity in everyone's music.",
      name: "MS",
      image: "/assets/dummy-audience.png"
    },
    {
      id: 2,
      quote: "Awesome vibes \m/",
      name: "AA",
      image: "/assets/dummy-audience.png"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
        
        <div className="mb-16">
          <Carousel className="max-w-3xl mx-auto">
            <CarouselContent>
              {testimonials.map(testimonial => (
                <CarouselItem key={testimonial.id}>
                  <div className="p-6 text-center">
                    <div className="mb-6">
                      {testimonial.image && (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                      )}
                      <blockquote className="text-xl italic mb-4">"{testimonial.quote}"</blockquote>
                      <cite className="font-medium">— {testimonial.name}</cite>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="max-w-lg mx-auto">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeDbYzuwbud0Wwb-3c6Var-yqqN_SxeriJCrC7Xs34BwcjklA/viewform?embedded=true"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;
