import { getServerSession } from "next-auth";
import { PricingSection } from "../other/pricing-section";
import { TestimonialsSection } from "../other/testimonials-section";
import { FeaturesSection } from "./features-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/option";

const Home = async () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Home;
