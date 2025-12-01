"use client";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";


export default function Product() {
  const params = useParams();
  const searchParams = useSearchParams();
  // const router = useRouter();

  // // Agar id "aimal" nahi, to 404 page ya redirect
  // if (params.id !== "aimal") {
  //   // client side redirect to 404
  //   router.replace("/404");
  //   return null; // temporary return
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2 className="text-3xl font-bold text-white">Product {params.id}</h2>
    </div>
  );
}
