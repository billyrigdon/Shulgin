import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { toggleAuth } from 'src/app/store/shared/actions/shared.actions';
import { getAuthState } from 'src/app/store/shared/selectors/shared.selector';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	isLoggedIn: Observable<boolean>;
	constructor(
		private storageService: StorageService,
		private profileService: ProfileService,
		private router: Router,
		private store: Store
	) {
		this.isLoggedIn = this.store.select(getAuthState);
	}

	ngOnInit(): void {}

	goToLogin() {
		this.router.navigateByUrl('/login');
	}

	goToSignup() {
		this.router.navigateByUrl('/signup');
	}

	goToProfile() {
		this.router.navigateByUrl('/profile');
	}

	goToExplore() {
		this.router.navigateByUrl('/explore');
	}

	//Remove token and user profile from session/local storage. Reload page
	signout() {
		this.storageService.signout();
		this.profileService.removeProfile();
		this.store.dispatch(toggleAuth({ status: false }));
		this.router.navigateByUrl('/explore');
	}
}
