import { CommonModule } from '@angular/common';
import { Component, computed, DoCheck, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';

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

  sortBy = signal<'name' | 'age'>('name');

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
  sortedStudents = computed(() => {
    const data = [...this.students()];

    if (this.sortBy() === 'name') {
      return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    return data.sort((a, b) => a.age - b.age);
  });
}
