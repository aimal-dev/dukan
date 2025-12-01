import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/app/types/product";

const inr = (p: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(
    p / 100
  );

export default function ProductCard(props: ProductCardProps) {
  const { id, name, price, imageUrl, stock = 0, discountPct = 0 } = props;
  const hasDiscount = discountPct > 0;
  const mrp = hasDiscount ? Math.round(price / (1 - discountPct / 100)) : price;

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-3">
        <div className="relative rounded-lg bg-gray-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              width={600}
              height={600}
              className="h-48 w-full object-contain"
            />
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {hasDiscount && (
            <Badge className="absolute left-2 top-2 bg-rose-600 hover:bg-rose-600">
              -{discountPct}%
            </Badge>
          )}
        </div>
        text
        <Link
          href={`/product/${id}`}
          className="mt-3 block text-sm font-medium hover:underline"
        >
          {name}
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-semibold">{inr(price)}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {inr(mrp)}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm">Add to Cart</Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/product/${id}`}>View</Link>
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-gray-500">
          {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
        </p>
      </CardContent>
    </Card>
  );
}
