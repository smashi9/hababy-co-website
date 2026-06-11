import { getProductSummaries } from "@/lib/supabase/queries";

export default async function SupabaseTestPage() {
  const products = await getProductSummaries();

  return (
    <main style={{ padding: "48px", fontFamily: "system-ui, sans-serif" }}>
      <h1>Supabase Product Test</h1>

      <p>
        This temporary page confirms that the Next.js app can read seeded product
        data from Supabase.
      </p>

      <p>
        <strong>Products found:</strong> {products.length}
      </p>

      <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
        {products.map((product) => (
          <article
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <h2 style={{ margin: "0 0 8px" }}>{product.name}</h2>
            <p style={{ margin: "0 0 8px" }}>
              <strong>Slug:</strong> {product.slug}
            </p>
            <p style={{ margin: "0 0 8px" }}>
              <strong>Daily:</strong> {product.daily_price_mad} MAD
            </p>
            <p style={{ margin: "0 0 8px" }}>
              <strong>Weekly:</strong> {product.weekly_price_mad} MAD
            </p>
            <p style={{ margin: "0 0 8px" }}>
              <strong>Deposit:</strong> {product.deposit_mad} MAD
            </p>
            <p style={{ margin: 0 }}>
              <strong>Availability:</strong> {product.availability_mode}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}