import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";
import HeroSection from "../components/LandingPage/HeroSection/heroSection";
import "../styles/background.css";
import Lamp from "../components/LandingPage/Lamp/lamp";
import FeatureCard from "../components/LandingPage/FeatureCard/featureCard";
import FeatureStack from "../components/LandingPage/FeatureStack/featureStack";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-gray-100 font-sans">
        {/* Hero Section */}
        <HeroSection />
        <Lamp />
        {/* Features Section */}
        <FeatureStack />
        <FeatureCard />
        
        {/* Footer */}
        <footer className="bg-black bg-opacity-20 py-10 text-center text-gray-400">
          <p className="text-sm">© {new Date().getFullYear()} WorkNest. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}
