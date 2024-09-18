"use client";

import { getCourseByIdUser } from "@/actions/course/course.action";
import Loader from "@/components/loader";

import { Button } from "@/components/ui/button";
import useUpdateEffect from "@/hooks/useUpdateHook";
import { useUserContext } from "@/providers/AuthUserProvider";
import { ICourse } from "@/types/course.type";
import { IUser } from "@/types/user/user.type";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import {
  ListChapter,
  SheetDemo,
  TabsDemo,
} from "./_components/CoursePlayerComponents";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeChapter, setActiveChapter] = useState<number | undefined>(
    Number(searchParams?.activeChapter) ?? undefined
  );
  const [course, setCourse] = useState<null | ICourse>(null);
  const { user }: { user: IUser } = useUserContext();
  const pathname = usePathname();

  const getCourse = async () => {
    setLoading(true);
    try {
      const response = await getCourseByIdUser(params.slug);
      if (response.error?.message) {
        throw new Error(response.error.message);
      }
      if (response?.data?.data) {
        setCourse(response.data.data);
        if (!activeChapter) {
          setActiveChapter(response.data?.data?.chapters[0].id);
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getCourse();
  }, []);

  useUpdateEffect(() => {
    setTimeout(() => {
      window.history.replaceState(
        null,
        "",
        `${pathname}?activeChapter=${activeChapter}`
      );
    }, 1000);
  }, [activeChapter]);

  const userEnrollment = useMemo(
    () => course?.enrollments?.find((e) => e.userId === user.id),
    [user?.id, course?.id]
  );

  const chapter = useMemo(
    () => course?.chapters.find((c) => c?.id === activeChapter),
    [activeChapter, course?.id, user?.id]
  );

  if (loading || error || !course) {
    return (
      <div
        className="flex-1 flex justify-center items-center"
        onClick={async () => {
          console.log("thichoe");
          const response = await getCourseByIdUser(params.slug);
          console.log(response);
        }}
      >
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-12 gap-2 relative flex-1">
          <SheetDemo
            course={course ?? undefined}
            setActiveChapter={setActiveChapter}
            activeChapter={activeChapter}
          />
          <div className="col-span-12 md:col-span-9 flex flex-col gap-2">
            <div className="mt-2 mx-2 flex justify-between items-center">
              <h1 className="text-xl font-semibold ">{course?.title} </h1>
              {userEnrollment?.rating ? (
                ""
              ) : (
                <Button size={"xs"}>Add Review</Button>
              )}
            </div>

            <div className="min-h-[240px]">
              {chapter?.videoLink && (
                <video
                  width="320"
                  height="240"
                  controls
                  className="w-full max-h-[370px] object-scale-down rounded-lg border"
                  // ref={videoRef}
                  key={activeChapter}
                >
                  <source src={chapter?.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div>
              <TabsDemo course={course ?? undefined} chapter={chapter} />
            </div>
          </div>
          <div className="col-span-3 flex-col gap-2 border-l hidden md:flex">
            <ListChapter
              chapters={course?.chapters}
              setActiveChapter={setActiveChapter}
              activeChapter={activeChapter}
            />
          </div>
        </div>
      </div>
    );
  }
}
