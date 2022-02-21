import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(
		private storageService: StorageService,
		private profileService: ProfileService
	) {}

	ngOnInit(): void {}

	//Remove token and user profile from session/local storage. Reload page
	signout() {
		this.storageService.signout();
		this.profileService.removeProfile();
		window.location.reload();
	}
}
