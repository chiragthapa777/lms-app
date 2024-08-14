"use client";
import { CircleUser, Home, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navigation = [
    {
      link: "/admin",
      name: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      iconBig: <Home className="h-6 w-6" />,
    },
    {
      link: "/admin/course",
      name: "Course",
      icon: <Home className="h-4 w-4" />,
      iconBig: <Home className="h-6 w-6" />,
    },
    {
      link: "/admin/review",
      name: "Review",
      icon: <Home className="h-4 w-4" />,
      iconBig: <Home className="h-6 w-6" />,
    },
    {
      link: "/admin/user",
      name: "User",
      icon: <Home className="h-4 w-4" />,
      iconBig: <Home className="h-6 w-6" />,
    },
  ];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Course Cloud</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigation.map((nav) => {
                const isActive = pathname === nav.link;
                return (
                  <Link
                    href={nav.link}
                    key={nav.link}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive ? "bg-muted text-primary" : ""
                    }`}
                  >
                    {nav.icon}
                    {nav.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                {navigation.map((nav) => {
                  const isActive = pathname === nav.link;
                  return (
                    <Link
                      href={nav.link}
                      key={nav.link}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-foreground hover:text-foreground ${
                        isActive ? "bg-muted text-primary" : ""
                      }`}
                    >
                      {nav.iconBig}
                      {nav.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
