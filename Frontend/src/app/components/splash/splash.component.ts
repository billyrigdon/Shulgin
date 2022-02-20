import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-splash',
	templateUrl: './splash.component.html',
	styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
	constructor(
		private router: Router,
		private tokenStorageService: TokenStorageService
	) {}

	//If already logged in, navigate to homepage
	ngOnInit(): void {
		if (this.tokenStorageService.getToken()) {
			this.router.navigateByUrl('/home');
		}
	}

	goToLogin() {
		this.router.navigateByUrl('/login');
	}

	goToSignup() {
		this.router.navigateByUrl('/signup');
	}
}
