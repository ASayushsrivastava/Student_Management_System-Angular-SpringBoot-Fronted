import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Student, StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  private studentService = inject(StudentService);
  public router = inject(Router);

  students = signal<Student[]>([]);

  ngOnInit() {
    this.studentService.getAll().subscribe((data) => {
      this.students.set(data);
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => {
      this.students.update((list) => list.filter((s) => s.id !== id));
    });
  }
}
