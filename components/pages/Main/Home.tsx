import { FeaturesSection } from "./features-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;
