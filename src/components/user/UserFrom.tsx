"use client";
import { createUserAction } from "@/actions/user/user.admin.action";
import { userSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Loader from "../loader";

type Props = {};

export default function UserFrom({}: Props) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
      avatar: undefined,
    },
  });
  const [uploadLoading, setUploadingLoading] = useState(false);
  const router = useRouter();

  const { setValue, getValues } = form;

  const handleUpload = async (e: any) => {
    setUploadingLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "course-cloud"); // Replace with your upload preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dnnqnwwsp/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setValue("avatar", data.secure_url);
    } else {
      console.error("Upload failed");
    }

    setUploadingLoading(false);
  };

  async function onSubmit(values: z.infer<typeof userSchema>) {
    const body: any = {
      ...values,
      confirmPassword: undefined,
    };
    const response = await createUserAction(body);
    if (response.data) {
      toast.success("Admin created successfully");
      router.push("/admin/user");
    } else {
      toast.error(response?.error?.message);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col relative">
              {getValues().avatar && !uploadLoading ? (
                <Image
                  width={1000}
                  height={1000}
                  src={getValues().avatar as string}
                  alt="Profile pic"
                  className="w-full h-[370px] object-scale-down rounded-lg border"
                />
              ) : (
                <div className="w-full h-[370px] bg-muted border-dashed border-2 rounded-lg flex justify-center items-center ">
                  {uploadLoading ? (
                    <Loader />
                  ) : (
                    <p className="opacity-70">No Photo</p>
                  )}
                </div>
              )}
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleUpload}
              />
              <label
                className="absolute bg-primary text-primary-foreground p-2 rounded-lg bottom-0 m-4 opacity-50 hover:opacity-100 cursor-pointer"
                htmlFor="avatar"
              >
                {" "}
                change photo
              </label>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
