"use client";
import { deleteCourseAction } from "@/actions/course/course.admin.action";
import ImageWrapper from "@/components/ImageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICourse } from "@/types/course.type";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";

type Props = { courses: ICourse[] };

export default function CourseTable({ courses }: Props) {
  const handleDelete = async (id: number) => {
    const response = await deleteCourseAction(id);
    if (response.data) {
      toast.success("Successfully deleted");
    } else {
      toast.error(response?.error?.message);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="hidden sm:table-cell">
              <ImageWrapper
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={course.photoLink}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium">{course.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{course.category}</Badge>
            </TableCell>
            <TableCell className="font-medium">Rs. {course.price}</TableCell>
            <TableCell className="hidden md:table-cell">
              {moment(course.createdAt).format("MMMM Do YYYY")}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link href={"/admin/course/edit/" + course.id}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(course.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
