import { getChapterById } from "@/actions/course/course.chapter.action";
import ChapterForm from "@/components/course/ChapterForm";
import Loader from "@/components/loader";
import { IChapter } from "@/types/course.type";
import { Suspense } from "react";

type Props = { params: { courseId?: number; id: number } };

export default async function page({ params }: Props) {
  if (params?.courseId) {
    const chapter = getChapterById(Number(params.courseId));
    return (
      <div className="flex flex-col gap-4">
        <p className=" text-primary font-bold text-2xl">
          Edit Chapter #{params.courseId}
        </p>
        <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
          {chapter.then((data) => {
            return (
              <ChapterForm
                chapter={data.data?.data as IChapter}
                courseId={params.id}
              />
            );
          })}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className=" text-primary font-bold text-2xl">Add New Chapter</p>
      <ChapterForm courseId={Number(params.id)} />;
    </div>
  );
}
