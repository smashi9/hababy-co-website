import Image from "next/image";
import Link from "next/link";

export type HomeProductSummary = {
  id: string;
  name: string;
  slug: string;
  daily_price_mad: number;
  weekly_price_mad: number;
  deposit_mad: number;
  availability_mode: string;
  display_order: number;
};

type HomePageProps = {
  products: HomeProductSummary[];
};

const categories = [
  "Travel cots",
  "Strollers",
  "Car seats",
  "High chairs",
  "Baby baths",
  "Feeding",
  "Sleep accessories",
];

const valueProps = [
  {
    title: "Travel Light",
    copy: "Leave bulky gear off the packing list and request the essentials before you arrive.",
  },
  {
    title: "Clean & Inspected",
    copy: "Every item is prepared, checked, and made ready before it reaches another family.",
  },
  {
    title: "Delivered Before Arrival",
    copy: "We confirm timing and delivery details so the right gear is waiting in Rabat.",
  },
];

const steps = [
  "Choose what you need",
  "Send a request",
  "We confirm availability within 24 hours",
  "We arrange payment, delivery, and pickup",
];

const bundles = [
  "Rabat Arrival",
  "Sleep Easy",
  "Car & City",
  "Grandparents Hosting",
  "Full Baby Setup",
  "New Parent Emergency",
];

const welcomeKits = ["Essential", "Sleep & Bath", "Feeding", "Premium Arrival"];

const deliveryZones = [
  "Rabat",
  "Agdal",
  "Hay Riad",
  "Souissi",
  "Hassan",
  "L'Orangeraie",
  "Temara",
  "Harhoura",
  "Rabat-Sale Airport",
];

const fallbackProducts: HomeProductSummary[] = [
  {
    id: "fallback-travel-cot",
    name: "Travel cot",
    slug: "travel-cot",
    daily_price_mad: 60,
    weekly_price_mad: 300,
    deposit_mad: 500,
    availability_mode: "request",
    display_order: 1,
  },
  {
    id: "fallback-compact-stroller",
    name: "Compact stroller",
    slug: "compact-stroller",
    daily_price_mad: 50,
    weekly_price_mad: 250,
    deposit_mad: 400,
    availability_mode: "request",
    display_order: 2,
  },
  {
    id: "fallback-infant-car-seat",
    name: "Infant car seat",
    slug: "infant-car-seat",
    daily_price_mad: 50,
    weekly_price_mad: 250,
    deposit_mad: 500,
    availability_mode: "confirm",
    display_order: 3,
  },
];

const availabilityLabels: Record<string, string> = {
  request: "Request to book",
  confirm: "Personally confirmed",
  on_request: "Available on request",
  hidden: "Hidden",
};

export function HomePage({ products }: HomePageProps) {
  const previewProducts = products.length > 0 ? products.slice(0, 3) : fallbackProducts;

  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <ValuePropsSection />
      <ProductPreviewSection products={previewProducts} isFallback={products.length === 0} />
      <TrustSection />
      <BundlesSection />
      <WelcomeKitsSection />
      <DeliveryZonesSection />
      <FinalCtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-sand/70">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-18">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-soft">
            <Image
              src="/brand/hababy-stork-mark.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            Rabat pilot - personally confirmed
          </div>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Baby gear rental in Rabat, delivered before you arrive.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/78">
            Travel lighter with clean, carefully prepared baby and toddler
            essentials, personally confirmed before every delivery.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#request" className="btn btn-primary">
              Request a booking
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              Chat on WhatsApp
            </Link>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-ink/70">
            Submitting a request does not instantly confirm a booking. Hababy &
            Co checks availability, delivery timing, and payment/deposit details
            before handover.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-page p-5 shadow-soft">
          <div className="rounded-[1.5rem] bg-white px-6 py-8 text-center">
            <Image
              src="/brand/hababy-logo-primary.svg"
              alt="Hababy & Co primary logo"
              width={260}
              height={260}
              priority
              className="mx-auto h-auto w-48 sm:w-60"
            />
            <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
              {["Cleaned", "Checked", "Delivered"].map((label) => (
                <div key={label} className="rounded-2xl border border-taupe/25 bg-page p-4">
                  <p className="text-sm font-extrabold text-primary">{label}</p>
                  <p className="mt-1 text-sm leading-5 text-ink/70">
                    Prepared with care for your family.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section bg-page">
      <SectionIntro
        eyebrow="How it works"
        title="A request-first service, checked by a real person."
        copy="Every request is personally checked so we can confirm the right items, timing, and delivery details for your family."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article key={step} className="card">
            <span className="step-number">{index + 1}</span>
            <h3 className="mt-5 text-lg font-extrabold text-ink">{step}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValuePropsSection() {
  return (
    <section className="section bg-white">
      <SectionIntro
        eyebrow="Why parents ask us"
        title="Less gear in transit. More calm when you arrive."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {valueProps.map((item) => (
          <article key={item.title} className="card">
            <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductPreviewSection({
  products,
  isFallback,
}: {
  products: HomeProductSummary[];
  isFallback: boolean;
}) {
  return (
    <section id="products" className="section bg-page">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionIntro
            eyebrow="Rent baby gear"
            title="Start with the essentials."
            copy="Browse the first pilot categories and request what your family needs. Availability is never treated as instant checkout."
          />
          <div className="mt-6 grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <div key={category} className="category-tile">
                {category}
              </div>
            ))}
          </div>
        </div>
        <div>
          {isFallback ? (
            <p className="mb-4 rounded-2xl border border-taupe/25 bg-white px-4 py-3 text-sm text-ink/70">
              Product preview is showing local placeholder cards until Supabase
              product data is available.
            </p>
          ) : null}
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="card">
                <span className="badge">
                  {availabilityLabels[product.availability_mode] ?? "Request to book"}
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{product.name}</h3>
                <p className="mt-3 text-sm text-ink/70">
                  From {product.daily_price_mad} MAD/day
                </p>
                <p className="mt-1 text-sm text-ink/70">
                  Deposit estimate: {product.deposit_mad} MAD
                </p>
                <Link href="#request" className="mt-5 inline-flex text-sm font-extrabold text-primary">
                  Request this item
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section id="safety" className="section bg-sand/55">
      <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <Image
            src="/brand/hababy-stork-mark.svg"
            alt=""
            width={150}
            height={150}
            className="mx-auto h-auto w-28"
          />
          <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
            The Hababy Promise
          </p>
        </div>
        <div>
          <SectionIntro
            eyebrow="Trust and safety"
            title="Prepared with care, checked like a parent would."
            copy="Cleanliness, fit, and safety-sensitive details matter. Car seats require child age, weight, and height details so suitability can be personally confirmed before handover."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Cleaned and inspected before delivery",
              "Textiles washed between rentals",
              "Safety-sensitive items personally confirmed",
              "Prepared before your family arrives",
            ].map((item) => (
              <div key={item} className="promise-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BundlesSection() {
  return (
    <section id="bundles" className="section bg-white">
      <SectionIntro
        eyebrow="Curated bundles"
        title="Useful setups for common family arrivals."
        copy="Bundles are designed to help families choose calmly without building every request from scratch."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => (
          <article key={bundle} className="card">
            <span className="badge badge-soft">Curated request</span>
            <h3 className="mt-5 text-xl font-extrabold text-ink">{bundle}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              Placeholder bundle preview. Items, estimate, and deposit are
              confirmed before handover.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WelcomeKitsSection() {
  return (
    <section id="welcome-kits" className="section bg-page">
      <SectionIntro
        eyebrow="Welcome Kits"
        title="Arrival essentials, sold as optional add-ons."
        copy="Welcome Kits are not rentals. They help with diapers, wipes, feeding, bath, and comfort items when families arrive tired."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {welcomeKits.map((kit) => (
          <article key={kit} className="card">
            <span className={kit === "Premium Arrival" ? "badge badge-sage" : "badge badge-soft"}>
              {kit === "Premium Arrival" ? "Organic cues" : "Purchase add-on"}
            </span>
            <h3 className="mt-5 text-xl font-extrabold text-ink">{kit}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/72">
              Brands and preferences are confirmed before delivery.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeliveryZonesSection() {
  return (
    <section id="delivery-zones" className="section bg-white">
      <SectionIntro
        eyebrow="Rabat pilot"
        title="Currently piloting in Rabat and nearby family-friendly neighborhoods."
        copy="The pilot is intentionally local so Hababy & Co can focus on punctual delivery, clean preparation, and personal service."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        {deliveryZones.map((zone) => (
          <span key={zone} className="zone-pill">
            {zone}
          </span>
        ))}
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="request" className="bg-primary px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/75">
          Request-first booking
        </p>
        <h2 className="mt-4 font-heading text-3xl leading-tight sm:text-5xl">
          Arriving in Rabat with little ones?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85">
          Tell us what you need and when you arrive. We will confirm
          availability, delivery, and payment/deposit details before handover.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="#products" className="btn bg-white text-primary hover:bg-page">
            Request a booking
          </Link>
          <Link href="#contact" className="btn border border-white/60 text-white hover:bg-white/10">
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-ink/72">{copy}</p> : null}
    </div>
  );
}
