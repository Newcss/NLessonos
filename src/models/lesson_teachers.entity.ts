import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Lesson } from './lesson.entity';

@Entity('lesson_teachers')
export class LessonToTeacher {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.lessonToTeacher)
  public teacher: Teacher;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonToTeacher)
  public lesson: Lesson;

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  setTeacher(id: number) {
    const teacher = new Teacher();
    teacher.setId(id);
    this.teacher = teacher;
  }
}
