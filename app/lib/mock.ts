import type { Product } from "@/app/types/product";

export const MOCK_PRODUCTS: Product[] = [
{ id: "p1", name: "Atta 5kg", price: 32000, stock: 12, imageUrl: "/p-atta.png", categoryId: "Staples", discountPct: 10 },
{ id: "p2", name: "Chini 1kg", price: 4500, stock: 30, imageUrl: "/p-sugar.png", categoryId: "Staples", discountPct: 5 },
{ id: "p3", name: "Basmati Rice 5kg", price: 52000, stock: 8, imageUrl: "/p-rice.png", categoryId: "Staples", discountPct: 18 },
{ id: "p4", name: "Sunflower Oil 1L", price: 15000, stock: 15, imageUrl: "/p-oil.png", categoryId: "Staples", discountPct: 12 },
{ id: "p5", name: "Orange Juice", price: 11000, stock: 20, imageUrl: "/p-juice.png", categoryId: "Beverages", discountPct: 7 },
{ id: "p6", name: "Cookies 500g", price: 9000, stock: 25, imageUrl: "/p-cookies.png", categoryId: "Snacks", discountPct: 20 },
];