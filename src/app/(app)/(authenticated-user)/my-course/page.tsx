import { listCourseEnrolledActionUser } from "@/actions/course/course.action";
import CourseCard from "@/components/app/course-card";
import { Container } from "@/components/container";
import Loader from "@/components/loader";
import { ICourse } from "@/types/course.type";
import { Suspense } from "react";

type Props = {};

export default function page({}: Props) {
  const courses = listCourseEnrolledActionUser({});
  return (
    <div className="flex flex-col gap-6 p-6">
      <Container className="flex flex-col gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your courses
        </h4>
        <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
          {courses.then((response) => {
            const courses = response.data?.data ?? [];
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {courses.map((course: ICourse) => (
                  <CourseCard
                    course={course}
                    key={course.id}
                    href={`/my-course/${course.id}`}
                    buttonText="View Course"
                    hidePrice={true}
                    hideRating={true}
                  />
                ))}
              </div>
            );
          })}
        </Suspense>
      </Container>
    </div>
  );
}
