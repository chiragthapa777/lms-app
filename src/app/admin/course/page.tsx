import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

import {
  deleteCourseAction,
  listCourseAction,
} from "@/actions/course/course.admin.action";
import ImageWrapper from "@/components/ImageWrapper";
import Loader from "@/components/loader";
import PaginationFooter from "@/components/PaginationFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { objectToQueryString } from "@/lib/utils";
import { IActionResponse } from "@/types/action-return-generic";
import { ICourse } from "@/types/course.type";
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponsePagination } from "@/types/response-generic";
import { ROLE_ENUM } from "@/types/user/user.type";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CourseTable from "./_components/CourseTable";

export default function userListPage({
  searchParams,
}: {
  searchParams: IPaginationQuery & { role?: ROLE_ENUM };
}) {
  const pageUrl = "/admin/course";
  const queryParam: IPaginationQuery & { role?: ROLE_ENUM } = {
    limit: searchParams.limit ?? 20,
    page: searchParams.page ?? 1,
    search: searchParams.search ?? "",
    role: searchParams.role ?? undefined,
  };

  const course: Promise<IActionResponse<IResponsePagination<ICourse>>> =
    listCourseAction(queryParam);

  const setSearch = async (fromData: FormData) => {
    "use server";
    const search = fromData.get("search");
    queryParam.search = (search as string) ?? "";
    redirect(pageUrl + "?" + objectToQueryString(queryParam));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" text-primary font-bold text-2xl">Courses</p>
      </div>
      <div className="ml-auto flex items-center gap-2 justify-between w-full">
        <div className="flex gap-2">
          <form className="" action={setSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search user..."
                id="search"
                name="search"
                defaultValue={queryParam.search}
                className="pl-8 sm:w-[200px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
        <Link href={pageUrl + "/add"}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Course
            </span>
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Loader className="border rounded-lg min-h-32" />}>
        {course.then((response) => {
          const courses = response.data?.data ?? [];
          return (
            <Card>
              <CardContent>
                <CourseTable courses={courses} />
              </CardContent>
              <CardFooter>
                <PaginationFooter
                  pageUrl={pageUrl}
                  pagination={response.data?._pagination}
                  query={queryParam}
                />
              </CardFooter>
            </Card>
          );
        })}
      </Suspense>
    </div>
  );
}
