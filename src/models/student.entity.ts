import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LessonToStudent } from './lesson_students.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => LessonToStudent, (lessonToStudent) => lessonToStudent.lesson)
  public lessonToStudent: LessonToStudent[];

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }
}
