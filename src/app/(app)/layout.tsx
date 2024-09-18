import AppHeader from "@/components/AppHeader";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="grow min-h-1 flex flex-col">{children}</main>
      <footer className="border-t mt-4 p-4 text-center text-sm text-gray-600 ">
        © 2024 CloudCourse™. All rights reserved.
      </footer>{" "}
    </div>
  );
}
