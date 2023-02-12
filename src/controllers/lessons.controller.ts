import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { LessonsService } from '../models/lessons.service';
import { Lesson } from '../models/lesson.entity';
import { ResponseLessons } from '../types/responseLessons';
import { Pagination } from 'src/types/pagination';
import { GetPagination } from 'src/decorators/get-pagination';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequstLessonDto } from '../types/requestLesson.dto';
import { LessonRequestValidator } from '../validators/lessonrequest.validator';

@ApiTags('lessons')
@Controller('/')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get('/')
  @ApiParam({
    name: 'date',
    type: 'Date[]',
    required: false,
    description:
      'Either one date in the YYYY-MM-DD format, or two in the same format ' +
      'separated by commas (for example, "2019-01-01,2019-09-01". If one date is specified, ' +
      'classes for that date are selected. If 2 dates are specified, then classes for the ' +
      'period are selected, including the specified dates.',
  })
  @ApiParam({
    name: 'status',
    type: 'boolean',
    required: false,
    description:
      'The status of the class. either 0 (not conducted) or 1 (conducted) is accepted',
  })
  @ApiParam({
    name: 'teacherIds',
    type: 'number[]',
    required: false,
    description:
      'teachers IDs separated by commas. All classes taught by at least one of these teachers are selected.',
  })
  @ApiParam({
    name: 'studentsCount',
    type: 'number',
    required: false,
    description:
      'the number of students enrolled in classes. ' +
      'Either one number (then an activity with the exact number of recorded is selected), ' +
      'or 2 numbers separated by commas, then they are considered as a range and classes ' +
      'with the number of recorded that fall into the range inclusive are selected.',
  })
  @ApiParam({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The number of the page to be returned. the first page is 1.',
  })
  @ApiParam({
    name: 'lessonsPerPage',
    type: 'number',
    required: false,
    description:
      'The number of classes per page. By default, there are 5 classes. ' +
      'In case of incorrect data, the method should return error 400 with a description of ' +
      "the error (format of the performer's choice).",
  })
  @ApiResponse({
    status: 200,
    description: 'The record is successfully created',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  async getAll(
    @GetPagination() pagination: Pagination,
  ): Promise<ResponseLessons[]> {
    if (pagination.error.length > 0) {
      throw new HttpException(pagination.error, 400);
    }
    console.log('Exec: lessonsService.findAll');
    return this.lessonsService.findAll(pagination);
  }

  @Post('/lessons')
  @ApiParam({
    name: 'teacherIds',
    type: 'number[]',
    required: true,
    description: 'id of teachers leading classes',
  })
  @ApiParam({
    name: 'title',
    type: 'string',
    required: true,
    description: 'The topic of the lesson. The same for all created classes',
  })
  @ApiParam({
    name: 'days',
    type: 'number[]',
    required: true,
    description:
      'The days of the week for which you need to create classes, where 0 is Sunday',
  })
  @ApiParam({
    name: 'firstDate',
    type: 'Date',
    required: true,
    description: 'The first date from which to create classes',
  })
  @ApiParam({
    name: 'lastDate',
    type: 'Date',
    required: true,
    description: 'The last date before which you need to create classes',
  })
  @ApiParam({
    name: 'lessonsCount',
    type: 'number',
    required: true,
    description: 'Number of classes to create',
  })
  @ApiResponse({
    status: 200,
    description: 'The record is successfully created',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiOperation({
    summary: 'Gets all products from every category',
    description:
      'The lessonsCount and lastDate parameters are mutually exclusive, meaning only one ' +
      'of these parameters should be used. If a lessonsCount is specified, then you need ' +
      'to create classes on the specified days of the week, starting from the first Date, ' +
      'until a lessonsCount of classes is created. If lastDate is specified, then you need ' +
      'to create classes on the specified days of the week, starting from firstDate and up ' +
      'to the lastDate date. Set a limit on the number of classes - 300, and by date - 1 year. ' +
      'For example, if we specify a period of 1 year and classes every day, then only 300 classes ' +
      'should be created. Another example: If we specify classes only on Mondays and the number is 300, ' +
      'then classes should be created only for the year ahead (there will be about 50 of them). ' +
      'In case of incorrect data, the method should return error 400 with a description of the ' +
      "error (format of the performer's choice). Upon successful creation of classes, an array with " +
      'the id of the created classes should be returned.',
  })
  async postLessons(@Body() data: RequstLessonDto): Promise<number[]> {
    const toValidate: string[] = [
      'teacherIds',
      'title',
      'days',
      'firstDate',
      'lessonsCount',
      'lastDate',
    ];
    const errors: ResponseError[] = LessonRequestValidator.validate(
      data,
      toValidate,
    );

    if (errors.length > 0) {
      throw new HttpException(errors, 400);
    }

    return this.lessonsService.insertAll(data);
  }
}
