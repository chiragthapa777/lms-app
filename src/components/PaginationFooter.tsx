import { IPagination, IResponsePagination } from "@/types/response-generic";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { IPaginationQuery } from "@/types/pagination.type";
import { objectToQueryString } from "@/lib/utils";

type Props = {
  pagination?: IPagination;
  pageUrl: string;
  query?: IPaginationQuery;
};

export default function PaginationFooter({
  pagination,
  pageUrl,
  query,
}: Props) {
  const hasNext = !!pagination?.nextPage;
  const nextPage: IPaginationQuery = {
    ...query,
    page: pagination?.nextPage ?? 1,
  };
  const lastPage: IPaginationQuery = {
    ...query,
    page: pagination?.totalPage ?? 1,
  };
  const prevPage: IPaginationQuery = {
    ...query,
    page: pagination?.prevPage ?? 1,
  };

  const startItem =
    ((pagination?.page ?? 1) - 1) * (pagination?.limit ?? 0) + 1;
  const endItem = Math.min(
    pagination?.page ?? 1 * (pagination?.limit ?? 0),
    pagination?.totalPage ? pagination.totalPage * pagination.limit : 0
  );

  return (
    <>
      <div className="text-xs text-muted-foreground">
        Showing{" "}
        <strong>
          {startItem}-{endItem}
        </strong>{" "}
        of{" "}
        <strong>
          {(pagination?.totalPage ?? 1) * (pagination?.limit ?? 20)}
        </strong>{" "}
        products
      </div>
      <Pagination className="justify-end">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href={pageUrl + "?" + objectToQueryString(prevPage)}
              disabled={!pagination?.prevPage}
            />
          </PaginationItem>

          {/* First Page */}
          <PaginationItem>
            <PaginationLink
              href={pageUrl + "?" + objectToQueryString({ ...query, page: 1 })}
              isActive={pagination?.page === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Ellipsis before the active page if the current page is greater than 2 */}
          {pagination?.page && pagination.page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Current Page Link */}
          {pagination?.page &&
            pagination.page > 2 &&
            pagination.page < pagination.totalPage && (
              <PaginationItem>
                <PaginationLink
                  href={
                    pageUrl +
                    "?" +
                    objectToQueryString({ ...query, page: pagination.page })
                  }
                  isActive={true}
                >
                  {pagination.page}
                </PaginationLink>
              </PaginationItem>
            )}

          {/* Ellipsis after the active page if there are more than two pages left */}
          {pagination?.page && pagination.page < pagination.totalPage - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last Page */}

          {pagination?.totalPage && pagination.totalPage > 1 ? (
            <PaginationItem>
              <PaginationLink
                href={pageUrl + "?" + objectToQueryString(lastPage)}
                isActive={pagination?.page === pagination?.totalPage}
              >
                {pagination?.totalPage}
              </PaginationLink>
            </PaginationItem>
          ) : (
            ""
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href={pageUrl + "?" + objectToQueryString(nextPage)}
              disabled={!hasNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
