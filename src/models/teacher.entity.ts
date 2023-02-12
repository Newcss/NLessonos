import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LessonToTeacher } from './lesson_teachers.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(
    () => LessonToTeacher,
    (lessonToTeacher) => lessonToTeacher.teacher,
  )
  public lessonToTeacher: LessonToTeacher[];

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
