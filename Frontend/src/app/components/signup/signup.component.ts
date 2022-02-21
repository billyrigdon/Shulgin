import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private storageService: StorageService
	) {
		this.form = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	signup() {
		const val = this.form.value;

		//Send post request, save token response to local storage, navigate to createProfile page
		if (val.username && val.email && val.password) {
			this.authService
				.signup(val.username, val.email, val.password)
				.subscribe((res) => {
					this.storageService.saveToken(res.token);
					this.storageService.saveUser(res.username);
					this.router.navigateByUrl('/createProfile');
				});
		}
	}
}