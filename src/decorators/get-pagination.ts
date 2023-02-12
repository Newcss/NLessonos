import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from '../types/pagination';

export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const paginationParams: Pagination = {
      page: 1,
      teacherIds: [],
      error: [],
    };

    paginationParams.lessonsPerPage = req.query.lessonsPerPage
      ? parseInt(req.query.lessonsPerPage.toString())
      : 5;

    if (req.query.status) {
      switch (req.query.status) {
        case '0':
          paginationParams.status = 0;
          break;
        case '1':
          paginationParams.status = 1;
          break;
      }
    }
    paginationParams.page = req.query.page
      ? parseInt(req.query.page.toString())
      : 1;

    // date
    paginationParams.date = req.query.date
      ? req.query.date
          .toString()
          .split(',')
          .map((item): Date => {
            return new Date(item);
          })
      : [];

    if (paginationParams.date.length > 0) {
      const isDateArray =
        paginationParams.date.length > 0 &&
        paginationParams.date.every((value) => {
          return !isNaN(value.getTime());
        });
      if (!isDateArray)
        paginationParams.error.push({
          errCode: 400,
          value: 'date must be array of Dates in format YYYY-MM-DD',
        });
      if (paginationParams.date.length > 2)
        paginationParams.error.push({
          errCode: 400,
          value: 'studentsCount  value must contain 1 or 2 numeric elements',
        });

      paginationParams.date = paginationParams.date.sort().reverse();
    }

    // studentsCount
    paginationParams.studentsCount = req.query.studentsCount
      ? req.query.studentsCount
          .toString()
          .split(',')
          .map((item) => parseInt(item, 10))
      : [];

    if (paginationParams.studentsCount.length > 0) {
      const isNumberArray =
        paginationParams.studentsCount.length > 0 &&
        paginationParams.studentsCount.every((value) => {
          return !isNaN(value);
        });
      if (!isNumberArray)
        paginationParams.error.push({
          errCode: 400,
          value: 'studentsCount must be array of numbers',
        });
      if (paginationParams.studentsCount.length > 2)
        paginationParams.error.push({
          errCode: 400,
          value: 'studentsCount  value must contain 1 or 2 numeric elements',
        });

      paginationParams.studentsCount = paginationParams.studentsCount.sort();
    }

    paginationParams.teacherIds = req.query.teacherIds
      ? req.query.teacherIds
          .toString()
          .split(',')
          .map((item) => parseInt(item, 10))
      : [];

    if (paginationParams.teacherIds.length > 0) {
      const isNumberArray =
        paginationParams.teacherIds.length > 0 &&
        paginationParams.teacherIds.every((value) => {
          return !isNaN(value);
        });
      if (!isNumberArray)
        paginationParams.error.push({
          errCode: 400,
          value: 'teacherIds must be array of numbers',
        });
    }

    console.log('Teachers IDs:');

    console.log(req.query.teacherIds);
    console.log(paginationParams.teacherIds);
    console.log('return Pagination params');
    return paginationParams;
  },
);
