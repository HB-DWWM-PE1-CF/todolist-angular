import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = this.fb.group({
    // new FormControl('');
    email: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public submit(): void {
    // POST login/pass
    this.form.disable();

    this.httpClient.post<{token: string}>(
      environment.apiUrl + '/api/authentication-token',
      this.form.value
    ).subscribe((data: {token: string}) => {
      localStorage.setItem('access_token', data.token);

      this.router.navigate(['']);
    }, () => {
      // Here fail login.
      this.form.enable();
      alert('Error login');
    });
  }

  public get isLogged(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
