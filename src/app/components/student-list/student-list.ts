import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  private router = inject(Router);

  students: Student[] = [];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe((data) => {
      this.students = data;
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure?')) {
      this.studentService.delete(id).subscribe(() => {
        this.students = this.students.filter((s) => s.id !== id);
      });
    }
  }
}
