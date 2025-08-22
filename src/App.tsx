
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtistDirectory from "./pages/ArtistDirectory";
import Events from "./pages/Events";
import Performances from "./pages/Performances";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/artists" element={<ArtistDirectory />} />
    <Route path="/performances" element={<Performances />} />
    <Route path="/events" element={<Events />} />
    <Route path="/testimonials" element={<Testimonials />} />
    <Route path="/contact" element={<Contact />} />
    
    {/* Admin routes */}
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
