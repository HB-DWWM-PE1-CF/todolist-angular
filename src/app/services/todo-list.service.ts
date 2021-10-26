import { Injectable } from '@angular/core';
import {Todo} from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public todoList: Array<Todo> = [
    {
      label: 'foo',
      at: new Date(),
      finished: true,
    }, {
      label: 'bar',
      at: new Date(),
      finished: false,
    }, {
      label: 'foobar',
      at: new Date(),
      finished: true,
    }
  ];

  constructor() { }
}
