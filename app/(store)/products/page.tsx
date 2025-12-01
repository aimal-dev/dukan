import ProductCard from "@/components/store/ProductCard";
import ProductFilters from "@/components/store/ProductFilters";
import SortSelect from "@/components/store/SortSelect";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/app/types/product";
import type { SortKey } from "@/app/types/filters";
import { MOCK_PRODUCTS } from "@/app/lib/mock";

type Props = { searchParams: { [key: string]: string | string[] | undefined } };

const CATS = [
  "Staples",
  "Snacks",
  "Beverages",
  "Dairy & Eggs",
  "Fruits & Veggies",
] as const;

export default function ProductsPage({ searchParams }: Props) {
  const getStr = (k: string, d = "") =>
    typeof searchParams[k] === "string" ? (searchParams[k] as string) : d;

  const selectedCats = getStr("c").split(",").filter(Boolean);
  const min = Number(getStr("min", "0"));
  const max = Number(getStr("max", "5000"));
  const inStock = getStr("stock") === "1";
  const sort = getStr("sort", "new") as SortKey;
  const q = getStr("q").toLowerCase();

  // Filter + sort (server side on mock)
  let items = MOCK_PRODUCTS.filter((p) => {
    const priceRs = Math.round(p.price / 100);
    const catOk =
      !selectedCats.length || selectedCats.includes(p.categoryId || "");
    const priceOk = priceRs >= min && priceRs <= max;
    const stockOk = !inStock || (p.stock ?? 0) > 0;
    const nameOk = !q || p.name.toLowerCase().includes(q);
    return catOk && priceOk && stockOk && nameOk;
  });

  if (sort === "plh") items = items.sort((a, b) => a.price - b.price);
  if (sort === "phl") items = items.sort((a, b) => b.price - a.price);

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
          initial={{ cats: selectedCats, min, max, inStock, sort,price:[min,max] }}
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
