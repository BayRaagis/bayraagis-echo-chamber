
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
      show: "Missed Melodies (May 10, 2025)",
      name: "MS",
      image: `${import.meta.env.BASE_URL}assets/dummy-audience.png`
    },
    {
      id: 2,
      quote: "Great singers with unique voices and styles that complimented each other with \
      the different types of music they were performing. Their uniqueness kept the concert interesting and engaging, \
      like trying different flavors of food. Caliber of performance was high, very tight and well rehearsed. \
      Instrumentalists were on point and need a lot of credit for the cohesion/depth of the songs. \
      The dancer was absolutely fantastic! Huge charisma and stage presence.",
      show: "BayRaagis Turns 1 (Aug 09, 2025)",
      name: "Anon",
      image: `${import.meta.env.BASE_URL}assets/dummy-audience.png`
    },
    {
      id: 3,
      quote: "What an incredible experience it has been to enjoy great music that is designed, conceived, and presented at each show. \
      The variety of talent, genres of music, and the sheer \"passion to entertain\" by everyone on stage (and behind the scenes) makes \
      me yearn for the next one at the end of every show.",
      show: "Multiple shows",
      name: "NN",
      image: `${import.meta.env.BASE_URL}assets/dummy-audience.png`
    },
    {
      id: 4,
      // quote: "We recently hosted a Carnatic concert at our home in celebration of a Puja, and the experience was truly magical. \
      // A huge thank you to Bayraagis for their invaluable help in connecting us with the perfect artists for such an auspicious occasion. \
      // The performance itself was extraordinary. Krishna ji's vocals were deeply moving, and his rendition of the divine songs brought \
      // a beautiful, spiritual energy to our home that perfectly captured the spirit of the puja. He was brilliantly accompanied by Ajay ji \
      // on the mridangam and Sasi ji on the violin. The immense talent, devotion, and seamless synergy of this trio created an unforgettable \
      // atmosphere that left everyone spellbound. I cannot recommend these incredibly gifted musicians and the Bayraagis team for facilitating \
      // highly enough. They brought so much joy and grace to our home!",
      quote: "A huge thank you to Bayraagis for their invaluable help in connecting us with the perfect artists for a Carnatic concert on \
      an auspicious occasion. The immense talent, devotion, and seamless synergy of Krishna Parthasarathy ji, Sasi Madgula ji, and Ajay Gopi ji created an unforgettable \
      atmosphere that left everyone spellbound. I cannot recommend these incredibly gifted musicians and the Bayraagis team for facilitating \
      highly enough. They brought so much joy and grace to our home!",
      show: "Private home concert",
      name: "Ms Praveena Cherukuri",
      image: `${import.meta.env.BASE_URL}assets/dummy-audience.png`
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
        
        <div className="mb-16">
          <Carousel opts={{ loop: true }} className="max-w-3xl mx-auto">
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
