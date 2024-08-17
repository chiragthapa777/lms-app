import AppHeader from "@/components/AppHeader";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
