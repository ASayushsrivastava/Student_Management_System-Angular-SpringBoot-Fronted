import { Component, inject } from '@angular/core';
import { Student, StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm {
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  student: Student = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  };

  isEdit = false;
  studentId!: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.studentId = +id;
      this.studentService.getById(this.studentId).subscribe((data) => {
        this.student = data;
      });
    }
  }

  submit() {
    const request = this.isEdit
      ? this.studentService.update(this.studentId, this.student)
      : this.studentService.create(this.student);

    request.subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}
