import { Component } from '@angular/core';
import {Student} from './student/student';
/* eslint-disable  @typescript-eslint/no-explicit-any */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hw4';
  initStudents: Student[];
  students: Student[];
  search = '';
  sort = "None";
  addOrEdit = false;

  dobStart = new Date('1980-01-01');
  dobFinish = new Date('2006-01-01');
  markStart = 0.0;
  markFinish = 5.0;

  formStudent: Student = {
    fname: "",
    lname: "",
    patron: "",
    dob: new Date(),
    avgMark: 0
  };

  constructor() {
    this.initStudents = [new Student('Вася', 'Пупкин', 'Олегович', new Date('1998-01-02'), 4.3),
      new Student('Петр', 'Сидоров', 'Иванович', new Date('2002-09-12'), 4),
      new Student('Иван', 'Петров', 'Петрович', new Date('2000-06-06'), 4.5),
      new Student('Антон', 'Гончаров', 'Иванович', new Date('2001-03-03'), 4.7)];
    this.students = [];
    this.initStudents.forEach(val => this.students.push(Object.assign({}, val)));
  }

  findStudent(student: Student): boolean {
    return this.search.toUpperCase() === (student.lname + " " + student.fname).toUpperCase();
  }

  deleteStudent(index: number): void {
    if(confirm("Are you sure?")) {
      this.initStudents.splice(this.initStudents.indexOf(this.students[index]), 1);
      this.students.splice(index, 1);
    }
  }

  sortStudents(): void {
    switch (this.sort){
      case "None": {
        break;
      }
      case "ФИО": {
        this.students = this.students.sort(
          (obj1, obj2) => {
            if (obj1.lname > obj2.lname) {
              return 1;
            }
            if (obj1.lname < obj2.lname) {
              return -1;
            }
            if (obj1.fname > obj2.fname) {
              return 1;
            }
            if (obj1.fname < obj2.fname) {
              return -1;
            }
            if (obj1.patron > obj2.patron) {
              return 1;
            }
            if (obj1.patron < obj2.patron) {
              return -1;
            }
            return 0;
          }
        );
        break;
      }
      case "Дате рождения": {
        this.students = this.students.sort(
          (obj1, obj2) => {
            if (obj1.dob > obj2.dob) {
              return 1;
            }
            if (obj1.dob < obj2.dob) {
              return -1;
            }
            return 0;
          }
        );
        break;
      }
      case "Среднему баллу": {
        this.students = this.students.sort(
          (obj1, obj2) => {
            if (obj1.avgMark > obj2.avgMark) {
              return 1;
            }
            if (obj1.avgMark < obj2.avgMark) {
              return -1;
            }
            return 0;
          }
        );
        break;
      }
      default: {
        console.log("Error");
      }
    }
  }


  filterStudents(): void {
    this.students = [];
    this.initStudents.forEach(val => this.students.push(Object.assign({}, val)));
    this.sortStudents();
    this.filterStudentsByDOB();
    this.filterStudentsByMarks();
  }

  private filterStudentsByDOB(): void {
    const tmpArr: Student[] = [];
    const tmpDOBStart: Date = new Date(this.dobStart), tmpDOBFinish : Date = new Date(this.dobFinish);
    this.students.forEach(elem => {
      if (elem.dob >= tmpDOBStart && elem.dob <= tmpDOBFinish) {
        tmpArr.push(elem);
      }
    });
    this.students = [];
    tmpArr.forEach(val => this.students.push(Object.assign({}, val)));
  }

  private filterStudentsByMarks(): void {
    const tmpArr: Student[] = [];
    this.students.forEach(elem => {
      if (elem.avgMark >= this.markStart && elem.avgMark <= this.markFinish) {
        tmpArr.push(elem);
      }
    });
    this.students = [];
    tmpArr.forEach(val => this.students.push(Object.assign({}, val)));

  }

  resetFilters(): void {
    this.dobStart = new Date('1980-01-01');
    this.dobFinish = new Date('2006-01-01');
    this.markStart = 0.0;
    this.markFinish = 5.0;
    this.filterStudents();
  }

  addStudentFromForm(): void {
    const tmpStud : Student = new Student(this.formStudent.fname,this.formStudent.lname,
      this.formStudent.patron, new Date(this.formStudent.dob), this.formStudent.avgMark);
    this.initStudents.push(tmpStud);
    this.students = [];
    this.initStudents.forEach(val => this.students.push(Object.assign({}, val)));
    this.sortStudents();
    this.filterStudents();
    this.clearForm();

  }

  editStudentFromForm(): void {
    this.initStudents.forEach(val => {
      if (val.fname === this.formStudent.fname && val.lname === this.formStudent.lname
      && val.patron === this.formStudent.patron) {
        val.dob = new Date(this.formStudent.dob);
        val.avgMark = this.formStudent.avgMark;
      }
    })

    this.students = [];
    this.initStudents.forEach(val => this.students.push(Object.assign({}, val)));
    this.sortStudents();
    this.filterStudents();
    this.clearForm();

  }

  private clearForm(): void {
    this.formStudent.fname = "";
    this.formStudent.lname = "";
    this.formStudent.patron = "";
    this.formStudent.dob = new Date();
    this.formStudent.avgMark = 0;
  }

  validMark() : boolean {
    if (this.formStudent.avgMark >= 0 && this.formStudent.avgMark <=5) {
      return true;
    }
    return false;
  }

  Send(obj: unknown): void {
    this.formStudent = (obj as any).formStudent;
    if ((obj as any).addOrEdit == true) {
      this.addStudentFromForm();
    }
    else {
      this.editStudentFromForm();
    }
  }
}
