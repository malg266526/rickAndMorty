export const findPagesToFetch = (
  pageIndex: number,
  pageSize: number,
  serverPageSize: number,
) => {
  const howManyPagesToFetch = Math.ceil(pageSize / serverPageSize);
  const lastPageToFetch = Math.ceil((pageSize * pageIndex) / serverPageSize);

  const allPagesToFetch: number[] = [];
  for (let i = 0; i < howManyPagesToFetch; i++) {
    allPagesToFetch.push(lastPageToFetch - i);
  }

  return allPagesToFetch;
};
