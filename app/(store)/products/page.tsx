import ProductCard from "@/components/store/ProductCard";
import ProductFilters from "@/components/store/ProductFilters";
import SortSelect from "@/components/store/SortSelect";
import { Separator } from "@/components/ui/separator";
import type { SortKey } from "@/app/types/filters"; // adjust path if your types are under app/types
import { MOCK_PRODUCTS } from "@/app/lib/mock"; // adjust path if you kept it under app/lib

type SearchParams = Record<string, string | string[] | undefined>;
type Props = { searchParams: SearchParams | Promise<SearchParams> };

const CATS = [
  "Staples",
  "Snacks",
  "Beverages",
  "Dairy & Eggs",
  "Fruits & Veggies",
] as const;

function getParam(sp: SearchParams, key: string, fallback = "") {
  const v = sp?.[key];
  if (Array.isArray(v)) return v[0] ?? fallback;
  if (typeof v === "string") return v;
  return fallback;
}

export default async function ProductsPage({ searchParams }: Props) {
  // Next 15 friendly: await works even if it's not a Promise
  const sp = await searchParams;

  const selectedCats = getParam(sp, "c", "").split(",").filter(Boolean);
  const min = Number(getParam(sp, "min", "0")) || 0;
  const max = Number(getParam(sp, "max", "5000")) || 5000;
  const inStock = getParam(sp, "stock") === "1";
  const sort = getParam(sp, "sort", "new") as SortKey;
  const q = getParam(sp, "q", "").toLowerCase();

  let items = [...MOCK_PRODUCTS].filter((p) => {
    const priceRs = Math.round(p.price / 100);
    const catOk =
      !selectedCats.length || selectedCats.includes(p.categoryId || "");
    const priceOk = priceRs >= min && priceRs <= max;
    const stockOk = !inStock || (p.stock ?? 0) > 0;
    const nameOk = !q || p.name.toLowerCase().includes(q);
    return catOk && priceOk && stockOk && nameOk;
  });

  if (sort === "plh") items.sort((a, b) => a.price - b.price);
  if (sort === "phl") items.sort((a, b) => b.price - a.price);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">{items.length} results</div>
        <SortSelect initial={sort} />
      </div>
      <Separator />

      <div className="flex gap-6">
        <ProductFilters
          categories={Array.from(CATS)}
          initial={{ cats: selectedCats, min, max, inStock, sort,price:[min,max] }} // note: no 'price' here
        />
        <section className="w-full">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                imageUrl={p.imageUrl}
                stock={p.stock}
                discountPct={p.discountPct}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
