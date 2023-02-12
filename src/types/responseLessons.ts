export interface ResponseLessons {
  id: number; // id занятия
  date: string; // Дата занятия
  title: string; // Тема занятия
  status: 0 | 1; // Статус занятия
  visitCount: number; // Количество учеников, посетивших занятие (по полю visit)
  students: ResponseStudents[]; // Массив учеников, записанных на занятие { id: 1, // id ученика name: ‘Ivan’ // имя visit: true, } ],
  teachers: ResponseTeachers[]; // Массив учителей, ведущих занятие { id: 1, // id учителя name: ‘Tanya’ // имя } ]
}

export interface ResponseStudents {
  id: number;
  name: string;
  visit: boolean;
}

export interface ResponseTeachers {
  id: number;
  name: string;
}
