import { getCourseById } from "@/actions/course/course.admin.action";
import CourseForm from "@/components/course/CourseForm";
import Loader from "@/components/loader";
import { Suspense } from "react";

type Props = { params: { id: string } };

export default async function page({ params }: Props) {
  const course = getCourseById(params.id);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" text-primary font-bold text-2xl">
          Edit course #{params.id}
        </p>
      </div>
      <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
        {course.then((data) => {
          return <CourseForm course={data.data?.data} />;
        })}
      </Suspense>
    </div>
  );
}
