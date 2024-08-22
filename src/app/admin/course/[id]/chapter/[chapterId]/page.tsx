import { getChapterById } from "@/actions/course/course.chapter.action";
import ChapterForm from "@/components/course/ChapterForm";
import Loader from "@/components/loader";
import { IChapter } from "@/types/course.type";
import { Suspense } from "react";

type Props = { params: { chapterId: number; id: number } };

export default async function page({ params }: Props) {
  const chapter = getChapterById(Number(params.chapterId));
  return (
    <div className="flex flex-col gap-4">
      <p className=" text-primary font-bold text-2xl">
        Edit Chapter #{params.chapterId}
      </p>
      <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
        {chapter.then((data) => {
          console.log("🚀 ~ {chapter.then ~ data:", data);
          return (
            <ChapterForm
              chapter={data.data?.data as IChapter}
              courseId={Number(params.id)}
            />
          );
        })}
      </Suspense>
    </div>
  );
}
