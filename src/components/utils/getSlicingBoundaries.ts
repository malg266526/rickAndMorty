import { useMemo } from "react";

export const getSlicingBoundaries = (
  fetchedPage: number,
  serverPageSize: number,
  pageIndex: number,
  pageSize: number,
) => {
  const firstItemIndex = (fetchedPage - 1) * serverPageSize;

  const allFetchedItemsLastIndex = pageSize * pageIndex;

  const sliceToBeginning = pageSize * (pageIndex - 1) - firstItemIndex;
  const sliceToEnd = allFetchedItemsLastIndex - firstItemIndex;

  return useMemo(
    () => ({
      top: sliceToBeginning,
      end: sliceToEnd,
    }),
    [sliceToBeginning, sliceToEnd],
  );
};
