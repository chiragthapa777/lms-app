import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import Image from "next/image";

import { listUserAction } from "@/actions/user/user.admin.action";
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
import { IPaginationQuery } from "@/types/pagination.type";
import { IResponsePagination } from "@/types/response-generic";
import { IUser, ROLE_ENUM } from "@/types/user/user.type";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ImageWrapper from "@/components/ImageWrapper";

export default function userListPage({
  searchParams,
}: {
  searchParams: IPaginationQuery & { role?: ROLE_ENUM };
}) {
  const pageUrl = "/admin/user";
  const queryParam: IPaginationQuery & { role?: ROLE_ENUM } = {
    limit: searchParams.limit ?? 20,
    page: searchParams.page ?? 1,
    search: searchParams.search ?? "",
    role: searchParams.role ?? undefined,
  };

  const users: Promise<IActionResponse<IResponsePagination<IUser>>> =
    listUserAction(queryParam);

  const setSearch = async (fromData: FormData) => {
    "use server";
    const search = fromData.get("search");
    queryParam.search = (search as string) ?? "";
    redirect(pageUrl + "?" + objectToQueryString(queryParam));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" text-primary font-bold text-2xl">Users</p>
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
        <Link href={"/admin/user/add"}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Admin
            </span>
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Loader className="border rounded-lg min-h-32" />}>
        {users.then((response) => {
          const users = response.data?.data ?? [];
          return (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined date</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <ImageWrapper
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={user.avatar}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {moment(user.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
