import About from "@/components/about";
import Changelog from "@/components/changelog";
import Contact from "@/components/contact";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Metrics from "@/components/metrics";
import Section from "@/components/section";
import WorkIndex from "@/components/work-index";
import Words from "@/components/words";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <Section id="brief" index="01" label="Brief">
          <Words
            className="text-[clamp(1.9rem,4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            segments={[
              { t: "I build" },
              { t: "interfaces that ship", hl: true },
              {
                t: "— SaaS platforms in Next.js by trade, million-row datasets for sport. Design-grade on the surface, engineering-grade underneath.",
              },
            ]}
          />
        </Section>

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
