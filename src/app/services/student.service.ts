import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'http://localhost:8080/api/students';
  private http = inject(HttpClient);

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${id}`, student);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }
}
