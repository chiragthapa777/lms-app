"use client";
import {
  createChapterAction,
  updateChapterAction,
} from "@/actions/course/course.chapter.action";
import { handleUploadUtils } from "@/lib/utils";
import { ChapterSchema } from "@/schemas/chapter.schema";
import { IChapter } from "@/types/course.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

type Props = {
  chapter?: IChapter;
  courseId: number;
};

export default function ChapterForm({ chapter, courseId }: Props) {
  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    mode: "all",
    defaultValues: {
      title: chapter?.title ?? undefined,
      content: chapter?.content ?? undefined,
      videoLink: chapter?.content ?? undefined,
      courseId: courseId,
    },
  });
  const [uploadLoading, setUploadingLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setValue, getValues } = form;

  console.log(form);

  const handleUpload = async (e: any) => {
    await handleUploadUtils(e, {
      setUploadingLoading,
      setValue,
      fieldName: "videoLink",
      isVideo: true,
    });
  };

  async function createChapter(body: any) {
    const response = await createChapterAction(body);
    if (response.data) {
      toast.success("chapter created successfully");
      router.push("/admin/course/" + courseId);
    } else {
      toast.error(response?.error?.message);
    }
  }

  async function updateChapter(body: any) {
    if (chapter?.id) {
      const response = await updateChapterAction(chapter.id, body);
      if (response.data) {
        toast.success("chapter updated successfully");
        router.push("/admin/course/" + courseId);
      } else {
        toast.error(response?.error?.message);
      }
    }
  }

  async function onSubmit(values: z.infer<typeof ChapterSchema>) {
    setLoading(true);
    const body: any = {
      ...values,
    };
    if (!chapter) {
      await createChapter(body);
    } else {
      updateChapter(body);
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
              {getValues().videoLink && !uploadLoading ? (
                <video
                  width="320"
                  height="240"
                  controls
                  className="w-full h-[370px] object-scale-down rounded-lg border"
                >
                  <source
                    src={getValues().videoLink as string}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-[370px] bg-muted border-dashed border-2 rounded-lg flex justify-center items-center ">
                  {uploadLoading ? (
                    <Loader />
                  ) : (
                    <p className="opacity-70">No Video</p>
                  )}
                </div>
              )}
              <input
                id="avatar"
                type="file"
                className="hidden"
                accept="video/mp4"
                onChange={handleUpload}
              />
              <label
                className="absolute bg-primary text-primary-foreground p-2 rounded-lg top-0 right-0 m-4 opacity-50 hover:opacity-100 cursor-pointer"
                htmlFor="avatar"
              >
                {" "}
                Upload Video
              </label>
            </div>

            <FormField
              control={form.control}
              name="content"
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
          </div>

          <Button
            type="submit"
            disabled={loading || uploadLoading || !form.formState.isValid}
          >
            {chapter?.id ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
