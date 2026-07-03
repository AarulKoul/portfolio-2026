import AboutTerminal from "@/components/about-terminal";
import Atmosphere from "@/components/atmosphere";
import BootIntro from "@/components/boot-intro";
import Changelog from "@/components/changelog";
import Contact from "@/components/contact";
import CustomCursor from "@/components/custom-cursor";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Metrics from "@/components/metrics";
import Pipeline from "@/components/pipeline";
import Section from "@/components/section";
import SmoothScroll from "@/components/smooth-scroll";
import StackField from "@/components/stack-field";
import WorkCards from "@/components/work-cards";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Atmosphere />
      <CustomCursor />
      <BootIntro />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Pipeline />

        <Section id="index" index="02" label="Selected work">
          <WorkCards />
        </Section>

        <Section id="changelog" index="03" label="Changelog / Career">
          <Changelog />
        </Section>

        <Section id="metrics" index="04" label="Metrics">
          <Metrics />
        </Section>

        <Section id="stack" index="05" label="Stack">
          <StackField />
        </Section>

        <Section id="about" index="06" label="About">
          <AboutTerminal />
        </Section>
      </main>
      <div className="relative z-10">
        <Contact />
      </div>
    </>
  );
}
