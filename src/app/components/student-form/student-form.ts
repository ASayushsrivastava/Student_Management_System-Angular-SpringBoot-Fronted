import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from '../../services/student.service';

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

  student = signal<Student>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  });

  isEdit = signal(false);
  studentId = signal<number | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.isEdit.set(true);
    this.studentId.set(+id);

    this.studentService.getById(+id).subscribe((student) => {
      this.student.set(student);
    });
  }

  submit() {
    if (this.isEdit()) {
      this.studentService.update(this.studentId()!, this.student()).subscribe(() => {
        this.router.navigate(['/students']);
      });
    } else {
      this.studentService.create(this.student()).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
}
