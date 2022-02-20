import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(
		private tokenStorageService: TokenStorageService,
		private profileService: ProfileService
	) {}

	ngOnInit(): void {}

	//Remove token and user profile from session/local storage. Reload page
	signout() {
		this.tokenStorageService.signout();
		this.profileService.removeProfile();
		window.location.reload();
	}
}
