import { getCourseByIdUser } from "@/actions/course/course.action";
import CoursePage from "@/components/course/CoursePage";
import Loader from "@/components/loader";
import { IActionResponse } from "@/types/action-return-generic";
import { ICourse } from "@/types/course.type";
import { IResponse } from "@/types/response-generic";
import { Suspense } from "react";

type Props = { params: { id: string } };

export default async function page({ params }: Props) {
  const coursePromise: Promise<IActionResponse<IResponse<ICourse>>> =
    getCourseByIdUser(params.id);
  return (
    <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
      {coursePromise.then((response) => {
        const course = response.data?.data;
        if (!course) {
          throw new Error(response.error?.message ?? "Cannot find course");
        }
        return <CoursePage course={course} />;
      })}
    </Suspense>
  );
}
