export type SortKey = "new" | "plh" | "phl";
// Always [min, max] in Rupees
export type PriceRange = [number, number];

export type FiltersInitial = {
  cats: string[];
  min: number;
  max: number;
  inStock: boolean;
  sort: SortKey;
  price: PriceRange;
};
export type FiltersState = {
  cats: string[];
  price: PriceRange; // Rs
  inStock: boolean;
  sort: SortKey;
};

export type ProductFiltersProps = {
  categories: string[];
  initial: FiltersInitial;
};
