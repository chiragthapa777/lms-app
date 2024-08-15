"use client";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  navigation: any[];
};

export default function AdminHeader({ navigation }: Props) {
  const pathname = usePathname();

  return (
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
  );
}
