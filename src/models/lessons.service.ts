import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { Lesson } from './lesson.entity';
import { DateTime, Interval } from 'ts-luxon';
import {
  ResponseLessons,
  ResponseStudents,
  ResponseTeachers,
} from '../types/responseLessons';
import { Pagination } from '../types/pagination';
import { RequstLessonDto } from '../types/requestLesson.dto';
import { LessonToTeacher } from './lesson_teachers.entity';
import { Teacher } from './teacher.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(pagination: Pagination): Promise<ResponseLessons[]> {
    let result: ResponseLessons[] = [];
    const skip = (pagination.page - 1) * pagination.lessonsPerPage;

    const selectOptions = {
      relations: [
        'lessonToTeacher',
        'lessonToTeacher.teacher',
        'lessonToStudent',
        'lessonToStudent.student',
      ],
      where: {},
      take: pagination.lessonsPerPage,
      skip: skip,
    };
    if (pagination.teacherIds.length > 0)
      selectOptions.where = {
        lessonToTeacher: {
          teacher: {
            id: In(pagination.teacherIds),
          },
        },
      };

    if (pagination.date.length == 1) {
      selectOptions.where = {
        date: new Date(pagination.date[0]).toISOString(),
        ...selectOptions.where,
      };
    }

    if (pagination.date.length == 2) {
      selectOptions.where = {
        date: Between(
          new Date(pagination.date[0]).toISOString(),
          new Date(pagination.date[1]).toISOString(),
        ),
        ...selectOptions.where,
      };
    }
    if (pagination.status == 0 || pagination.status == 1)
      selectOptions.where = {
        status: pagination.status,
        ...selectOptions.where,
      };

    console.log('Select options: ', selectOptions);
    console.log('Pagination: ', pagination.date);

    const lessonsArray = await this.lessonRepository.find(selectOptions);
    lessonsArray.forEach((item) => {
      let count = 0;
      const students: ResponseStudents[] = [];
      const teachers: ResponseTeachers[] = [];
      item.lessonToStudent.forEach((itemStudent) => {
        if (itemStudent.visit) count++;
        students.push({
          id: itemStudent.student.id,
          name: itemStudent.student.name,
          visit: itemStudent.visit,
        });
      });

      item.lessonToTeacher.forEach((itemTeachers) => {
        teachers.push({
          id: itemTeachers.teacher.id,
          name: itemTeachers.teacher.name,
        });
      });

      result.push({
        id: item.id,
        date: item.getDate(), // Дата занятия
        title: item.title, // Тема занятия
        status: item.status ? 1 : 0, // Статус занятия
        visitCount: count, // Количество учеников, посетивших занятие (по полю visit)
        students: students, // Массив учеников, записанных на занятие { id: 1, // id ученика name: ‘Ivan’ // имя visit: true, } ],
        teachers: teachers, // Массив учителей, ведущих занятие { id: 1, // id учителя name: ‘Tanya’ // имя } ]
      });
    });

    switch (pagination.studentsCount.length) {
      case 1:
        result = result.filter(
          (item) => item.visitCount == pagination.studentsCount[0],
        );
        break;
      case 2:
        result = result.filter(
          (item) =>
            item.visitCount >= pagination.studentsCount[0] &&
            item.visitCount <= pagination.studentsCount[1],
        );
        break;
    }
    return result;
  }

  async insertAll(lessons: RequstLessonDto): Promise<Array<number>> {
    console.log('insertAll: ', lessons);
    const start = DateTime.fromISO(lessons.firstDate.toString());
    const tempEnd = start.plus({ years: 1 });
    // Maximal date interval = 1 year
    // If isset lessonsCount then not isset lastDate
    if (lessons.lessonsCount > 0) {
      lessons.lastDate = tempEnd.toString();
      if (lessons.lessonsCount > 300) lessons.lessonsCount = 300;
    } else {
      // Maximal create lessons = 300
      lessons.lessonsCount = 300;
      if (tempEnd < DateTime.fromISO(lessons.lastDate.toString())) {
        lessons.lastDate = tempEnd.toString();
      }
    }

    const end = DateTime.fromISO(lessons.lastDate.toString());
    const interval = Interval.fromDateTimes(start, end);
    const subIntervals = interval.splitBy({ days: 1 });
    let realCreatedElements = 0;
    const insertedIds: number[] = [];
    console.log('subIntervals: ', subIntervals.length);

    for (const nowDate of subIntervals) {
      console.log(nowDate.start.weekday);
      if (
        lessons.days.find((x) => x == nowDate.start.weekday) &&
        realCreatedElements < lessons.lessonsCount
      ) {
        realCreatedElements++;
        const newLesson = new Lesson();
        newLesson.setTitle(lessons.title);
        newLesson.setDate(nowDate.start.toJSDate());
        const teachers: LessonToTeacher[] = [];

        lessons.teacherIds.forEach((teacherIds) => {
          const teacher = new LessonToTeacher();
          teacher.setTeacher(teacherIds);
          teachers.push(teacher);
        });

        newLesson.setLessonToTeacher(teachers);

        await this.lessonRepository.save(newLesson).then((lessonId) => {
          insertedIds.push(lessonId.id);
        });
      }
    }
    return insertedIds;
  }
}
