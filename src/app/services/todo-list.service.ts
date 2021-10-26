import { Injectable } from '@angular/core';
import {Todo} from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private static STORAGE_KEY = '__TODO_LIST__';

  private todoListInternal: Array<Todo>|null = null;

  constructor() { }

  public get todoList(): Array<Todo> {
    if (this.todoListInternal === null) {
      const todoListString = localStorage.getItem(TodoListService.STORAGE_KEY);

      if (todoListString === null) {
        this.todoListInternal = [];
      } else {
        this.todoListInternal = JSON.parse(todoListString);
      }
    }

    // Load from localStorage on first call.
    return this.todoListInternal ?? [];
  }

  public set todoList(val: Array<Todo>) {
    this.todoListInternal = val;

    localStorage.setItem(TodoListService.STORAGE_KEY, JSON.stringify(this.todoListInternal));
  }
}
