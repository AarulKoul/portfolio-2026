import About from "@/components/about";
import Brief from "@/components/brief";
import Changelog from "@/components/changelog";
import Contact from "@/components/contact";
import Header from "@/components/header";
import Hero from "@/components/hero";
import IntroCurtain from "@/components/intro-curtain";
import Metrics from "@/components/metrics";
import Section from "@/components/section";
import WorkIndex from "@/components/work-index";

export default function Home() {
  return (
    <>
      <IntroCurtain />
      <Header />
      <main>
        <Hero />

        <Brief />

        <Section id="index" index="02" label="Index / Selected work">
          <WorkIndex />
        </Section>

        <Section id="changelog" index="03" label="Changelog / Career">
          <Changelog />
        </Section>

        <Section id="metrics" index="04" label="Metrics">
          <Metrics />
        </Section>

        <Section id="about" index="05" label="About">
          <About />
        </Section>
      </main>
      <Contact />
    </>
  );
}
