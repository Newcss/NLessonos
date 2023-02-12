export interface Pagination {
  page?: number;
  lessonsPerPage?: number;
  date?: Date[];
  status?: 0 | 1 | undefined;
  teacherIds?: number[];
  studentsCount?: number[];
  error?: ResponseError[];
}
