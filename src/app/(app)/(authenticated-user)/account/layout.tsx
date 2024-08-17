import {
  BookOpenCheck,
  LayoutDashboard,
  MessageSquareCode,
  User,
} from "lucide-react";

import AdminHeader from "@/components/admin-header";
import AdminHeaderDrawer from "@/components/admin-header-drawer";
import { Container } from "@/components/container";
import { adminGuard } from "@/guards/admin.guard";

const navigation = [
  {
    link: "/admin",
    name: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    iconBig: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    link: "/admin/course",
    name: "Course",
    icon: <BookOpenCheck className="h-4 w-4" />,
    iconBig: <BookOpenCheck className="h-6 w-6" />,
  },
  {
    link: "/admin/review",
    name: "Review",
    icon: <MessageSquareCode className="h-4 w-4" />,
    iconBig: <MessageSquareCode className="h-6 w-6" />,
  },
  {
    link: "/admin/user",
    name: "User",
    icon: <User className="h-4 w-4" />,
    iconBig: <User className="h-6 w-6" />,
  },
];

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await adminGuard();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminHeader navigation={navigation} />
      <div className="flex flex-col">
        <AdminHeaderDrawer navigation={navigation} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
