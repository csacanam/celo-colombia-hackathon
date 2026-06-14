import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { WhySection } from "@/components/WhySection";
import { BuildExamples } from "@/components/BuildExamples";
import { LearnGrid } from "@/components/LearnGrid";
import { Timeline } from "@/components/Timeline";
import { OfficeHours } from "@/components/OfficeHours";
import { Venue } from "@/components/Venue";
import { Prizes } from "@/components/Prizes";
import { Rubric } from "@/components/Rubric";
import { Mentors } from "@/components/Mentors";
import { Jurors } from "@/components/Jurors";
import { FAQ } from "@/components/FAQ";
import { ApplyForm } from "@/components/ApplyForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Hackathon de Agentes Onchain Colombia",
  description:
    "Aprende Vibe Coding, construye agentes y mini apps, y compite por premios en la Hackathon de Agentes Onchain de Celo Colombia.",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    { "@type": "Place", name: "Cali, Colombia" },
    { "@type": "VirtualLocation", name: "Virtual" },
  ],
  organizer: { "@type": "Organization", name: "Celo Colombia" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <WhySection />
        <BuildExamples />
        <LearnGrid />
        <Timeline />
        <OfficeHours />
        <Venue />
        <Prizes />
        <Rubric />
        <Mentors />
        <Jurors />
        <FAQ />
        <ApplyForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
