import ScrollProgress from "./scroll-progress";

const links = [
  { label: "Index", href: "#index" },
  { label: "Changelog", href: "#changelog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#top"
          className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.02em]"
          aria-label="Back to top"
        >
          A.KOUL<span className="text-blue">©</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-rule whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] md:hidden"
        >
          <span className="beat inline-block size-1.5 rounded-full bg-blue" />
          Contact
        </a>

        <p className="hidden items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft lg:flex">
          <span className="beat inline-block size-1.5 rounded-full bg-blue" />
          Open to work
        </p>
      </div>
      <ScrollProgress />
    </header>
  );
}
