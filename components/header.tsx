import ScrollProgress from "./scroll-progress";

const links = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "Record", href: "#record" },
  { index: "03", label: "Figures", href: "#figures" },
  { index: "04", label: "Author", href: "#author" },
  { index: "05", label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#top"
          className="whitespace-nowrap font-serif text-lg leading-none tracking-tight"
          aria-label="Back to top"
        >
          A<span className="text-ember">—</span>K
        </a>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-rule whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim transition-colors duration-300 hover:text-bone"
            >
              <span className="text-ember">{link.index}</span> {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] md:hidden"
        >
          <span className="beat inline-block size-1.5 rounded-full bg-ember" />
          Contact
        </a>

        <p className="hidden items-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-bone-dim lg:flex">
          <span className="beat inline-block size-1.5 rounded-full bg-ember" />
          Open to opportunities
        </p>
      </div>
      <ScrollProgress />
    </header>
  );
}
