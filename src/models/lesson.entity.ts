import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { LessonToTeacher } from './lesson_teachers.entity';
import { LessonToStudent } from './lesson_students.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  date: Date;

  @OneToMany(
    () => LessonToTeacher,
    (lessonToTeacher) => lessonToTeacher.lesson,
    { cascade: ['insert'] },
  )
  public lessonToTeacher: LessonToTeacher[];

  @OneToMany(
    () => LessonToStudent,
    (lessonToStudent) => lessonToStudent.lesson,
    { cascade: ['insert'] },
  )
  public lessonToStudent: LessonToStudent[];

  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getLessonToTeacher(): LessonToTeacher[] {
    return this.lessonToTeacher;
  }
  setLessonToTeacher(items: LessonToTeacher[]) {
    this.lessonToTeacher = items;
  }
  getLessonToStudent(): LessonToStudent[] {
    return this.lessonToStudent;
  }
  setLessonToStudent(students: LessonToStudent[]) {
    this.lessonToStudent = students;
  }

  getDate(): string {
    return this.date.toISOString().split('T')[0];
  }

  setDate(date: Date) {
    this.date = date;
  }
}
