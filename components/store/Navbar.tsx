"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="mt-8 space-y-3 text-sm">
                <Link href="/products" className="block">
                  Products
                </Link>
                <Link href="/category" className="block">
                  Categories
                </Link>
                <Link href="/dashboard" className="block">
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          text
          {/* Brand */}
          <Link href="/" className="text-xl font-bold">
            Dukan
          </Link>
          {/* Category menu (desktop) */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="grid w-[520px] grid-cols-2 gap-2 text-sm">
                      <Link
                        href="/category?c=fruits"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Fruits & Veggies
                      </Link>
                      <Link
                        href="/category?c=snacks"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Snacks
                      </Link>
                      <Link
                        href="/category?c=beverages"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Beverages
                      </Link>
                      <Link
                        href="/category?c=dairy"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Dairy & Eggs
                      </Link>
                      <Link
                        href="/category?c=bakery"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Bakery
                      </Link>
                      <Link
                        href="/category?c=staples"
                        className="rounded p-2 hover:bg-gray-50"
                      >
                        Cooking Essentials
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* Search + Cart */}
          <div className="ml-auto flex w-full max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search products…" className="pl-9" />
            </div>
            <Button variant="outline" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
