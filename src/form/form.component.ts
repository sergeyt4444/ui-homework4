import {Component, EventEmitter, Output} from '@angular/core';
import {Student} from '../app/student/student';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title = 'form';

  formStudent: Student = {
    fname: "",
    lname: "",
    patron: "",
    dob: new Date(),
    avgMark: 0
  };

  addOrEdit = false;
  @Output() buttonClick = new EventEmitter<unknown>();

  addStudent(): void {
    this.formStudent.dob = new Date(this.formStudent.dob);
    this.buttonClick.emit({
      addOrEdit: true,
      formStudent: this.formStudent
    });
    this.clearForm();
  }

  editStudent(): void {
    this.formStudent.dob = new Date(this.formStudent.dob);
    this.buttonClick.emit({
      addOrEdit: false,
      formStudent: this.formStudent
    })
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
}
