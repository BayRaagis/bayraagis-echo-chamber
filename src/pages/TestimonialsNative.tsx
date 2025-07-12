
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
      quote: "The fusion of Indian classical with jazz was absolutely mesmerizing. BayRaagis creates a musical experience unlike anything I've heard before!",
      name: "Sarah Johnson",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      quote: "As someone new to Indian music, BayRaagis made it accessible while still honoring the traditions. Their performances are emotionally moving and technically impressive.",
      name: "Michael Chen",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      quote: "The way they blend different musical worlds is pure genius. Each concert feels like a journey through cultures and emotions.",
      name: "Priya Patel",
      image: "/placeholder.svg"
    }
  ];

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      quote: "",
      email: ""
    },
  });

  const onSubmit = (values: z.infer<typeof testimonialSchema>) => {
    // In a real application, this would send the data to a backend
    console.log(values);
    toast({
      title: "Testimonial Submitted",
      description: "Thank you for your testimonial! It will be reviewed by our team."
    });
    form.reset();
  };

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
          <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Testimonial</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your experience with BayRaagis..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Submit Testimonial
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;
