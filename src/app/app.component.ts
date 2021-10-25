import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist-angular';
  public todoList: Array<string> = [
    'foo',
    'bar',
    'bar',
    'bar',
    'bar',
  ];
}
