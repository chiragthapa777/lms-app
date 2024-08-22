"use client";
import { logoutAction } from "@/actions/auth/auth.action";
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
import { useUserContext } from "@/providers/AuthUserProvider";
import { ROLE_ENUM } from "@/types/user/user.type";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
const navItems = [
  { href: "/", label: "Home" },
  { href: "/my-course", label: "My Courses" },
  { href: "/my-review", label: "My Reviews" },
];
export default function AppHeader({}: any) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginLogout = async () => {
    if (user?.id) {
      setUser(null);
      await logoutAction();
      toast.success("Logged out");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20 drop-shadow">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-muted-foreground transition-colors hover:text-foreground ${
              pathname === item.href && "text-primary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-muted-foreground transition-colors hover:text-foreground ${
                  pathname === item.href && "text-primary font-semibold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full md:w-auto items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/account">
              <DropdownMenuLabel className="capitalize cursor-pointer">
                {user?.name ? user.name : "My Account"}
              </DropdownMenuLabel>
            </Link>
            <DropdownMenuSeparator />
            {user?.role === ROLE_ENUM.ADMIN ? (
              <>
                <DropdownMenuItem
                  className="capitalize"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Admin Dashboard
                </DropdownMenuItem>
              </>
            ) : (
              ""
            )}
            <DropdownMenuItem onClick={handleLoginLogout}>
              {" "}
              {user?.id ? "Logout" : "Login"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
