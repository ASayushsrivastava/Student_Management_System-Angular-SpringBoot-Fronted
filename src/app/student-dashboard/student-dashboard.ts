import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StudentList } from '../components/student-list/student-list';
import { StudentForm } from '../components/student-form/student-form';
import { Card } from '../shared/card/card';

@Component({
  selector: 'app-student-dashboard',
  imports: [StudentList, StudentForm, Card],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard implements OnInit, AfterViewInit {
  @ViewChild(StudentList) list!: StudentList;

  ngOnInit() {
    console.log('Dashboard → ngOnInit');
  }

  ngAfterViewInit() {
    console.log('Dashboard → ngAfterViewInit');
  }

  refreshList() {
    console.log('Dashboard → refreshList');
    this.list.loadStudents();
  }
}
