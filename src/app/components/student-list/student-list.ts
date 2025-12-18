import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Student, StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit, DoCheck, OnDestroy {
  private service = inject(StudentService);
  private router = inject(Router);

  students = signal<Student[]>([]);
  selectedId = signal<number | null>(null);

  deletingId = signal<number | null>(null);

  ngOnInit() {
    console.log('StudentList → ngOnInit');
    this.loadStudents();
  }

  ngDoCheck() {
    console.log('StudentList → ngDoCheck');
  }

  ngOnDestroy() {
    console.log('StudentList → ngOnDestroy');
  }

  loadStudents() {
    this.service.getAll().subscribe((data) => {
      this.students.set(data);
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: number) {
    this.deletingId.set(id);

    setTimeout(() => {
      this.service.delete(id).subscribe(() => {
        this.students.update((list) => list.filter((s) => s.id !== id));
        this.deletingId.set(null);
      });
    }, 300);
  }

  selectRow(id: number) {
    this.selectedId.set(id);
  }
}
