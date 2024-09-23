"use client";
import Link from "next/link";

import { loginAction } from "@/actions/auth/auth.action";
import { ButtonWithLoading } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useUserContext } from "@/providers/AuthUserProvider";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export function LoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { loadUser } = useUserContext();
  const router = useRouter();
  const query = useSearchParams();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setLoading(true);
    const response = await loginAction(values);
    if (response.data) {
      toast.success("Login successful");
      loadUser(response.data);
      const redirectTo = query.get("redirectTo");
      // if (redirectTo) {
      //   router.push(redirectTo);
      // } else {
      router.push("/");
      // }
    } else {
      setError(response?.error?.message ?? "");
      toast.error(response.error?.message);
    }
    setLoading(false);
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-center text-destructive">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonWithLoading
              type="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </ButtonWithLoading>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
