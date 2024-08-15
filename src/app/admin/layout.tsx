import { Home } from "lucide-react";

import { getMeAction, getUser } from "@/actions/auth/auth.action";
import AdminHeader from "@/components/admin-header";
import AdminHeaderDrawer from "@/components/admin-header-drawer";
import { redirect } from "next/navigation";
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

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    localStorage.setItem("redirection", "/a");
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminHeader navigation={navigation} />
      <div className="flex flex-col">
        <AdminHeaderDrawer navigation={navigation} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
