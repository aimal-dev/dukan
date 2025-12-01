"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useState } from "react";
import type {
  ProductFiltersProps,
  FiltersState,
  SortKey,
  PriceRange 
} from "@/app/types/filters";

function useUrlUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    // router.push(${pathname}?${params.toString()}, { scroll: false });
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };
}

function FiltersContent({
  categories,
  state,
  setState,
}: {
  categories: string[];
  state: FiltersState;
  setState: React.Dispatch<React.SetStateAction<FiltersState>>;
}) {
  const toggleCat = (c: string) =>
    setState((s) => ({
      ...s,
      cats: s.cats.includes(c) ? s.cats.filter((x) => x !== c) : [...s.cats, c],
    }));

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        defaultValue={["cat", "price", "avail", "sort"]}
      >
        <AccordionItem value="cat">
          <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={state.cats.includes(c)}
                    onCheckedChange={() => toggleCat(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm">Price (₹)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Min: ₹{state.price[0]}</span>
                <span>Max: ₹{state.price[1]}</span>
              </div>
              <Slider
                min={0}
                max={5000}
                step={50}
                value={state.price}
                onValueChange={(v) => setState((s) => ({ ...s, price: v as PriceRange }))}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="avail">
          <AccordionTrigger className="text-sm">Availability</AccordionTrigger>
          <AccordionContent>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={state.inStock}
                onCheckedChange={(v) =>
                  setState((s) => ({ ...s, inStock: Boolean(v) }))
                }
              />
              In stock only
            </label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sort">
          <AccordionTrigger className="text-sm">Sort</AccordionTrigger>
          <AccordionContent>
            <Label className="sr-only">Sort by</Label>
            <Select
              value={state.sort}
              onValueChange={(v: SortKey) =>
                setState((s) => ({ ...s, sort: v }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="plh">Price: Low → High</SelectItem>
                <SelectItem value="phl">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default function ProductFilters({
  categories,
  initial,
}: ProductFiltersProps) {
  const updateUrl = useUrlUpdater();

  const [state, setState] = useState<FiltersState>({
    cats: initial.cats,
    price: [initial.min, initial.max],
    inStock: initial.inStock,
    sort: initial.sort,
  });

  const apply = () => {
    updateUrl({
      c: state.cats.join(",") || undefined,
      min: String(state.price[0]),
      max: String(state.price[1]),
      stock: state.inStock ? "1" : undefined,
      sort: state.sort,
      page: undefined,
    });
  };

  const clear = () => {
    setState({ cats: [], price: [0, 5000], inStock: false, sort: "new" });
    updateUrl({
      c: undefined,
      min: "0",
      max: "5000",
      stock: undefined,
      sort: "new",
      page: undefined,
    });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-24 hidden h-max w-64 shrink-0 rounded-xl border bg-white p-3 lg:block">
        <div className="mb-3 text-sm font-semibold text-gray-700">Filters</div>
        <FiltersContent
          categories={categories}
          state={state}
          setState={setState}
        />
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={apply}>
            Apply
          </Button>
          <Button size="sm" variant="outline" onClick={clear}>
            Clear
          </Button>
        </div>
      </aside>
      {/* Mobile sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="mt-6 space-y-4">
              <div className="text-sm font-semibold text-gray-700">Filters</div>
              <FiltersContent
                categories={categories}
                state={state}
                setState={setState}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={apply} className="flex-1">
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clear}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
