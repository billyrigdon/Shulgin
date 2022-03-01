import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';
import { toggleAuth } from 'src/app/store/shared/actions/shared.actions';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(
		private storageService: StorageService,
		private profileService: ProfileService,
		private router: Router,
		private store: Store
	) {}

	ngOnInit(): void {}

	goToHome() {
		this.router.navigateByUrl('home');
	}

	goToExplore() {
		this.router.navigateByUrl('explore');
	}

	//Remove token and user profile from session/local storage. Reload page
	signout() {
		this.storageService.signout();
		this.profileService.removeProfile();
		this.store.dispatch(toggleAuth({ status: false }));
		window.location.reload();
	}
}
