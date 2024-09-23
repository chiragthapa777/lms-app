"use client";
import {
  createCourseAction,
  updateCourseAction,
} from "@/actions/course/course.admin.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/cateogory.constant";
import { handleUploadUtils } from "@/lib/utils";
import { ICourse } from "@/types/course.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Loader from "../loader";
import RichTextEditor from "../text-editor";
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
import { CourseSchema } from "@/schemas/course.schema";

type Props = { course?: ICourse };

export default function CourseForm({ course }: Props) {
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    mode: "all",
    defaultValues: {
      title: undefined,
      description: course?.description ?? undefined,
      photoLink: undefined,
      category: undefined,
      price: 0,
    },
  });
  const [uploadLoading, setUploadingLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setValue, getValues } = form;

  useEffect(() => {
    if (course) {
      patchFormValue();
    }
  }, []);

  const patchFormValue = () => {
    if (course) {
      setValue("category", course.category, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("description", course.description, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("photoLink", course.photoLink, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("price", course.price, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("title", course.title, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  };

  const handleUpload = async (e: any) => {
    await handleUploadUtils(e, {
      setUploadingLoading,
      setValue,
      fieldName: "photoLink",
    });
  };

  async function createCourse(body: any) {
    const response = await createCourseAction(body);
    if (response.data) {
      toast.success("course created successfully");
      router.push("/admin/course");
    } else {
      toast.error(response?.error?.message);
    }
  }

  async function updateCourse(body: any) {
    if (course?.id) {
      const response = await updateCourseAction(course.id, body);
      if (response.data) {
        toast.success("course updated successfully");
        router.push("/admin/course");
      } else {
        toast.error(response?.error?.message);
      }
    }
  }

  async function onSubmit(values: z.infer<typeof CourseSchema>) {
    setLoading(true);
    const body: any = {
      ...values,
    };
    if (!course) {
      await createCourse(body);
    } else {
      updateCourse(body);
    }
    setLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        {/* <DevTool control={form.control} /> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="col-span-2 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col relative">
              {getValues().photoLink && !uploadLoading ? (
                <Image
                  width={1000}
                  height={1000}
                  src={getValues().photoLink as string}
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div>
                      <RichTextEditor {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem
                          value={item}
                          key={item}
                          className="capitalize"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={loading || uploadLoading || !form.formState.isValid}
          >
            {course?.id ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
