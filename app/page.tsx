import Author from "@/components/author";
import Contact from "@/components/contact";
import Figures from "@/components/figures";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import RecordSection from "@/components/record";
import Work from "@/components/work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <RecordSection />
        <Figures />
        <Author />
      </main>
      <Contact />
    </>
  );
}
