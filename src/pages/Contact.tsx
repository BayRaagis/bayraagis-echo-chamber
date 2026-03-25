
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  purpose: z.string().min(1, { message: "Please select a purpose." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const Contact = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      purpose: "",
      message: ""
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    // In a real application, this would send the data to a backend
    console.log(values);
    toast({
      title: "Message Sent",
      description: "Thank you for your message! We'll get back to you soon."
    });
    form.reset();
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="text-center">
          We are open to show bookings and inquiries! Reach us at <a href="mailto:bayraagis24@gmail.com">bayraagis24@gmail.com</a>
          <br /><br /><br />
        </div>

        <div className="max-w-lg mx-auto">
          For collaborations or joining the collective, please fill out the form below:
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdFiQMxRNOQE8Y_WsP25SCC_vq-j60MpsE5rh-41Ou_4XBQTA/viewform?embedded=true"
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

export default Contact;
