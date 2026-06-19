import HeroSection from "../components/home/HeroSection"
import StatsSection from "../components/home/StatsSection"
import FeaturesGridSection from "../components/common/FeaturesGridSection"
import ServicesSection from "../components/common/ServicesSection"
import ProductSlider from "../components/home/ProductSlider"
import HowItWorksSection from "../components/common/HowItWorksSection"
import TestimonialsSection from "../components/home/TestimonialsSection"
import ScrollRevealSection from "../components/home/ScrollRevealSection"
export default function Index() {
    return (
        <main className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">
            <HeroSection />
            <StatsSection />
            <FeaturesGridSection />
            <ServicesSection />
            <ProductSlider />
            <HowItWorksSection />
            <TestimonialsSection />
            <ScrollRevealSection />
        </main>
    )
}