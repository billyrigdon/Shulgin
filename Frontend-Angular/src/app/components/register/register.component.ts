import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    const val = this.form.value;

    if (val.username && val.email && val.password) {
      this.authService
        .signup(val.username, val.email, val.password)
        .subscribe((res) => {
          this.tokenStorageService.saveToken(res.token)          
          this.router.navigateByUrl('/');
        });
    }
  }
}
