import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
		private tokenStorage: TokenStorageService,
		private router: Router,
		private profileService: ProfileService
	) {
		this.form = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	login() {
		const val = this.form.value;

		if (val.email && val.password) {
			this.authService.login(val.email, val.password).subscribe((res) => {
				this.tokenStorage.saveToken(res.token);
				this.router.navigateByUrl('/home');
			});
		}
	}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			if (this.profileService.getProfile()) {
				this.router.navigateByUrl('/home');
			}
		}
	}
}
