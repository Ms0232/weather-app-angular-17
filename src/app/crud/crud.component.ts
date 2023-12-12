import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
interface MyObjectType {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  httpclient = inject(HttpClient);

  myObject: MyObjectType = {
    name: '',
    completed: false,
  };

  ngOnInit(): void {
    this.getAllTask();
  }

  tasks: any[] = [];

  getAllTask() {
    this.httpclient
      .get<any>(`http://localhost:3000/api/v1/tasks`)
      .subscribe((data: any) => {
        this.tasks = data.tasks;
      });
  }

  createNewtask() {
    this.createNewTask(this.myObject);
  }

  createNewTask(data: MyObjectType) {
    this.httpclient
      .post<any>(`http://localhost:3000/api/v1/tasks`, data)
      .subscribe(() => {
        this.tasks.push(this.myObject);
        this.myObject = { name: '', completed: false };
      });
  }

  completeTask(id: any) {
    this.httpclient
      .patch<any>(`http://localhost:3000/api/v1/tasks/${id}`, {
        completed: true,
      })
      .subscribe(() => {});
  }

  deleteTask(id: any) {
    this.httpclient
      .delete<any>(`http://localhost:3000/api/v1/tasks/${id}`)
      .subscribe(() => {
        this.refresh();
      });
  }

  refresh(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.route.snapshot.url.toString()]);
    });
  }
}
