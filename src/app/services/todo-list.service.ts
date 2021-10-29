import { Injectable } from '@angular/core';
import {Todo} from '../../models/todo';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListInternal: Array<Todo>|null = null;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public get todoList(): Observable<Array<Todo>> {
    if (this.todoListInternal === null) {
      return this.httpClient.get<Array<Todo>>(environment.apiUrl + '/api/todos');
    }

    return from([]);
  }

  // public set todoList(val: Array<Todo>) {
  //   this.todoListInternal = val;
  //
  //   localStorage.setItem(TodoListService.STORAGE_KEY, JSON.stringify(this.todoListInternal));
  // }

  public createTodo(todo: Todo): void {
    this.httpClient.post('https://192.168.215.76:8000/api/todos', todo)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
