import { PricingSection } from "@/components/pages/other/pricing-section";
import { Navbar } from "@/components/pages/Main/navbar";
import { Footer } from "@/components/pages/Main/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PricingSection />
      <Footer />
    </div>
  );
}
