import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private storageService: StorageService,
		private router: Router,
		private profileService: ProfileService
	) {
		this.form = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	//Make login post request, save token response to session storage, navigate to home
	login() {
		const val = this.form.value;

		if (val.email && val.password) {
			this.authService.login(val.email, val.password).subscribe((res) => {
				this.storageService.saveUser(res.username);
				this.storageService.saveToken(res.token);
				this.router.navigateByUrl('/home');
			});
		}
	}

	//If already logged in and user profile found, navigate to home 
	ngOnInit(): void {
		if (this.storageService.getToken()) {
			if (this.profileService.getProfile()) {
				this.router.navigateByUrl('/home');
			}
		}
	}
}