"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SortKey } from "@/app/types/filters";

export default function SortSelect({ initial }: { initial: SortKey }) {
const router = useRouter();
const pathname = usePathname();
const sp = useSearchParams();

return (
<Select
value={initial}
onValueChange={(v: SortKey) => {
const params = new URLSearchParams(sp.toString());
params.set("sort", v);
params.delete("page");
// router.push(${pathname}?${params.toString()}, { scroll: false });
 router.push(pathname + "?" + params.toString(), { scroll: false });
}}
>
<SelectTrigger className="w-[190px]">
<SelectValue placeholder="Sort by" />
</SelectTrigger>
<SelectContent>
<SelectItem value="new">Newest</SelectItem>
<SelectItem value="plh">Price: Low → High</SelectItem>
<SelectItem value="phl">Price: High → Low</SelectItem>
</SelectContent>
</Select>
);
}