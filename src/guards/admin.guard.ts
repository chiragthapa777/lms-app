"use server";
import { getUserAction } from "@/actions/auth/auth.action";
import { ROLE_ENUM } from "@/types/user/user.type";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function adminGuard() {
  const headersList = headers();
  const header_url = headersList.get("x-pathname") || "";
  const user = await getUserAction();
  const redirectToLogin = () => {
    redirect("/login?redirectTo=" + header_url);
  };
  if (!user) {
    redirectToLogin();
  }
  if (user.role !== ROLE_ENUM.ADMIN) {
    redirectToLogin();
  }
}
export async function userGuard() {
  const headersList = headers();
  const header_url = headersList.get("x-pathname") || "";
  const user = await getUserAction();
  const redirectToLogin = () => {
    redirect("/login?redirectTo=" + header_url);
  };
  if (!user) {
    redirectToLogin();
  }
  if (user.role !== ROLE_ENUM.USER) {
    redirectToLogin();
  }
}
