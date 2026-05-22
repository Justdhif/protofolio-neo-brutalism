import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import TimelineSection from "@/components/timeline-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ClickSpark from "@/components/click-spark";
import AiSection from "@/components/ai-section";

export default function Home() {
  return (
    <ClickSpark>
      <Navbar />

      <main className="flex flex-col flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <TestimonialsSection />
        <AiSection />
        <ContactSection />
      </main>

      <Footer />
    </ClickSpark>
  );
}
