import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-splash',
	templateUrl: './splash.component.html',
	styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
	constructor(
		private router: Router,
		private storageService: StorageService
	) {}

	//If already logged in, navigate to homepage
	ngOnInit(): void {
		if (this.storageService.getToken() && this.storageService.getUser()) {
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
