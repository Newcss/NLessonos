import validator from 'validator';
import { RequstLessonDto } from '../types/requestLesson.dto';
import { DateTime } from 'ts-luxon';
import { isSet } from 'util/types';
import { isInteger } from 'ts-luxon/dist/impl/util';
export class LessonRequestValidator {
  static validate(
    body: RequstLessonDto,
    toValidate: string[],
  ): ResponseError[] {
    const errors: ResponseError[] = [];
    let verifyCount = 0;

    if (toValidate.includes('title') && validator.isEmpty(body.title)) {
      errors.push({
        errCode: 401,
        value: 'Name cannot be empty',
      });
    }
    if (
      toValidate.includes('firstDate') &&
      isNaN(new Date(body.firstDate).getTime())
    ) {
      errors.push({
        errCode: 402,
        value: 'Invalid firstDate format',
      });
    }
    if (
      toValidate.includes('lastDate') &&
      isNaN(new Date(body.lastDate).getTime())
    ) {
      if (isNaN(body.lessonsCount))
        errors.push({
          errCode: 403,
          value: 'Invalid lastDate format',
        });
    } else verifyCount++;

    if (toValidate.includes('teacherIds') && body.teacherIds.length <= 0) {
      errors.push({
        errCode: 404,
        value: 'Invalid teacherIds format',
      });
    }
    if (!isNaN(body.lessonsCount)) verifyCount++;
    if (
      toValidate.includes('lessonsCount') &&
      body.lessonsCount <= 0 &&
      verifyCount <= 2
    ) {
      errors.push({
        errCode: 405,
        value: 'Invalid lessonsCount format',
      });
    }

    if (verifyCount >= 2) {
      errors.push({
        errCode: 406,
        value:
          'Error. lastDate  and lessonsCount cannot be passed together in the same request.',
      });
    }
    return errors;
  }
}
