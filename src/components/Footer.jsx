import logo from "../assets/logo.png";
import { org } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt={`${org.name} emblem`} className="h-10 w-10" />
          <div className="leading-tight text-white">
            <div className="font-display text-sm font-bold">{org.name}</div>
            <div className="text-xs text-white/70">{org.tagline}</div>
          </div>
        </div>
        <div className="text-center text-xs text-white/70 sm:text-right">
          <div>© {new Date().getFullYear()} {org.name} {org.tagline}</div>
          <div>{org.footerTagline}</div>
        </div>
      </div>
    </footer>
  );
}
