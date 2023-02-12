import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Lesson } from './lesson.entity';

@Entity('lesson_students')
export class LessonToStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.lessonToStudent)
  public student: Student;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonToTeacher)
  public lesson: Lesson;

  @Column()
  visit: boolean;

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }
}
