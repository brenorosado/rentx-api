export type Paginated = {
  content: any[];
  page: number;
  totalElements: number;
  totalPages: number;
};

export enum Direction {
  desc = 'desc',
  asc = 'asc',
}

export type Pagination = {
  skip: number;
  take: number;
};

export const getPagination = (size = 10, page = 1): Pagination => ({
  skip: Number(page - 1) * Number(size),
  take: Number(size),
});

export const paginatedParser = async (
  transaction: Promise<[number, any[]]>,
  page: number,
) => {
  const [totalElements, content] = await transaction;

  return {
    content: content,
    page,
    totalElements,
    totalPages: Math.ceil(totalElements / Number(page)),
  };
};
