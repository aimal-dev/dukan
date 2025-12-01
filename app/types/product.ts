export type Product = {
id: string;
name: string;
description?: string | null;
price: number; // paisa (₹1 = 100)
stock: number;
imageUrl?: string | null;
categoryId?: string | null;
rating?: number;
discountPct?: number;
};

export type ProductCardProps = Pick<
  Product,
  "id" | "name" | "price" | "imageUrl" | "stock" | "discountPct"
>;
