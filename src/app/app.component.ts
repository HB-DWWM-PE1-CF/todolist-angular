import {Component, OnInit} from '@angular/core';
import {Todo} from '../models/todo';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todolist-angular';
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

  // new FormArray();
  public form = this.fb.array([]);

  /**
   * Inject Angular's FormBuilder in our component.
   */
  public constructor(
    private fb: FormBuilder,
  ) {
  }

  /**
   * Call at component initialization. Use to prepare and set value in the form from todoList data source.
   */
  public ngOnInit(): void {
    for (let i = 0; i < this.todoList.length; i++) {
      this.addTodo();
    }

    this.form.setValue(this.todoList.map((todo: Todo) => {
      return {
          label: todo.label,
          at: formatDate(todo.at, 'YYYY-MM-dd', 'en'),
          finished: todo.finished,
        };
    }));

    // This code bellow do the same as above.
    // const arrTmp = [];
    // for (const todo of this.todoList) {
    //   const formTodo = {
    //     label: todo.label,
    //     at: formatDate(todo.at, 'YYYY-MM-dd', 'en'),
    //     finished: todo.finished,
    //   };
    //   arrTmp.push(formTodo);
    // }
    // this.form.setValue(arrTmp);
  }

  /**
   * Add a new form for To do in formArray.
   */
  public addTodo(): void {
    this.form.push(
      // new FormGroup();
      this.fb.group({
        // new FormControl();
        label: [''],
        // new FormControl();
        at: [new Date()],
        // new FormControl();
        finished: [false],
      })
    );
  }

  /**
   * Generic method to be use with all keys inside a FormGroup.
   */
  public getControl(formGroup: AbstractControl, key: string): FormControl
  {
    // We cannot set the type of the first argument as FormGroup (in template, we get AbstractControl).
    // Check if the method's first argument is of type FormGroup.
    if (!(formGroup instanceof FormGroup)) {
      throw new Error('Form given as first argument is not an instance of FormGroup');
    }

    const fc = formGroup.get(key);
    // Check if the field retrieve by given key is an instance of FormControl.
    if (!(fc instanceof FormControl)) {
      throw new Error('Form retrieve is not an instance of FormControl');
    }

    return fc;
  }

  // In our case, this function do the same result as the one use above. (But without strict type checking, because no instanceof).
  // public getControl(formGroup: AbstractControl, key: string): FormControl
  // {
  //   return (formGroup as FormGroup).get(key) as FormControl;
  // }
}
