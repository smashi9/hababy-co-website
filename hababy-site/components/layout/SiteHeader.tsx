import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Rent Gear", href: "/products" },
  { label: "Bundles", href: "/#bundles" },
  { label: "Welcome Kits", href: "/#welcome-kits" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Safety", href: "/#safety" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-taupe/25 bg-page/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Hababy & Co home">
          <Image
            src="/brand/hababy-logo-horizontal.svg"
            alt="Hababy & Co"
            width={190}
            height={62}
            priority
            className="h-auto w-36 sm:w-44"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-taupe/40 px-3 py-1 text-sm font-semibold text-ink/75 sm:inline-flex">
            EN
          </span>
          <Link href="/#contact" className="btn btn-secondary hidden sm:inline-flex">
            Chat on WhatsApp
          </Link>
          <Link href="/request" className="btn btn-primary">
            Request a booking
          </Link>
        </div>
      </div>
    </header>
  );
}
