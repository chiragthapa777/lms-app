import { userGuard } from "@/guards/admin.guard";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await userGuard();
  return <>{children}</>;
}
