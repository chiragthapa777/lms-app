import { getCourseById } from "@/actions/course/course.admin.action";
import Loader from "@/components/loader";
import { Suspense } from "react";
import CourseDetail from "../_components/CourseDetail";
import { ICourse } from "@/types/course.type";

type Props = { params: { id: string } };

export default async function page({ params }: Props) {
  const course = getCourseById(params.id);
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
        {course.then((data) => {
          return <CourseDetail course={data.data?.data as ICourse} />;
        })}
      </Suspense>
    </div>
  );
}
