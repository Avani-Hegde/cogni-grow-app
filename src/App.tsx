import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSelection from "./pages/UserSelection";
import ChildHome from "./pages/child/ChildHome";
import ChildExercises from "./pages/child/ChildExercises";
import ChildProgress from "./pages/child/ChildProgress";
import MemoryGame from "./pages/child/games/MemoryGame";
import ShapeGame from "./pages/child/games/ShapeGame";
import FunGame from "./pages/child/games/FunGame";
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard";
import TherapistDashboard from "./pages/therapist/TherapistDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          
          {/* Child Routes */}
          <Route path="/child" element={<ChildHome />} />
          <Route path="/child/exercises/:type" element={<ChildExercises />} />
          <Route path="/child/progress" element={<ChildProgress />} />
          
          {/* Child Game Routes */}
          <Route path="/child/play/memory/:id" element={<MemoryGame />} />
          <Route path="/child/play/shapes/:id" element={<ShapeGame />} />
          <Route path="/child/play/games/:id" element={<FunGame />} />
          
          {/* Caregiver Routes */}
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          
          {/* Therapist Routes */}
          <Route path="/therapist" element={<TherapistDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
