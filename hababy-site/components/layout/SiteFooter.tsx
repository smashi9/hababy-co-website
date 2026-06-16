import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Rent Gear", href: "/products" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Safety", href: "/#safety" },
  { label: "Delivery Zones", href: "/#delivery-zones" },
  { label: "Bundles", href: "/#bundles" },
  { label: "Welcome Kits", href: "/#welcome-kits" },
  { label: "Request a booking", href: "/request" },
];

const policyLinks = ["Terms", "Privacy", "Deposit Policy", "Cancellation Policy"];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-taupe/25 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/brand/hababy-logo-horizontal.svg"
            alt="Hababy & Co"
            width={190}
            height={62}
            className="h-auto w-40"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink/75">
            Parent-led baby gear rental in Rabat, prepared with care and
            reviewed before delivery.
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">
            Rabat-only pilot. More areas can wait until the service is ready.
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Explore</h2>
          <div className="mt-4 grid gap-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="footer-heading">Trust and policies</h2>
          <div className="mt-4 grid gap-2">
            {policyLinks.map((label) => (
              <span key={label} className="text-sm font-semibold text-ink/55">
                {label}
              </span>
            ))}
          </div>
          <Link href="/#contact" className="btn btn-secondary mt-6 inline-flex">
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </footer>
  );
}
