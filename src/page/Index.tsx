import HeroSection from "../components/home/HeroSection"
import StatsSection from "../components/home/StatsSection"
import SolutionsSection from "../components/home/SolutionsSection"
import FeaturesGridSection from "../components/common/FeaturesGridSection"
import ProductSlider from "../components/home/ProductSlider"
import HowItWorksSection from "../components/common/HowItWorksSection"
import TestimonialsSection from "../components/home/TestimonialsSection"
import ScrollRevealSection from "../components/home/ScrollRevealSection"



export default function Index() {

    return (

        <main className="min-h-screen bg-[#011a1e] text-white selection:bg-[#fcc42c] selection:text-[#011a1e]">

            <HeroSection />

            <StatsSection />

            <SolutionsSection />

            <FeaturesGridSection />

            <HowItWorksSection />

            <ProductSlider />

            <TestimonialsSection />

            <ScrollRevealSection />

        </main>

    )

}