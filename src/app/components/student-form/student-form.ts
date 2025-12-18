import { Component, EventEmitter, inject, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit, OnDestroy {
  private service = inject(StudentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @Output() saved = new EventEmitter<void>();

  student = signal<Student>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  });

  isEdit = signal(false);
  studentId = signal<number | null>(null);

  ngOnInit() {
    console.log('StudentForm → ngOnInit');

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.isEdit.set(true);
    this.studentId.set(+id);

    this.service.getById(+id).subscribe((data) => {
      this.student.set(data);
    });
  }

  ngOnDestroy() {
    console.log('StudentForm → ngOnDestroy');
  }

  submit() {
    console.log('StudentForm → submit');

    if (this.isEdit()) {
      this.service.update(this.studentId()!, this.student()).subscribe(() => {
        this.saved.emit();
        this.router.navigate(['/students']);
      });
    } else {
      this.service.create(this.student()).subscribe(() => {
        this.saved.emit();
        this.router.navigate(['/students']);
      });
    }
  }
  cancel() {
    console.log('StudentForm → cancel');
    this.router.navigate(['/students']);
  }
}
