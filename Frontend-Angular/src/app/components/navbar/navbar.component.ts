import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	constructor(private tokenStorageService: TokenStorageService) {}

	ngOnInit(): void {}

	signout() {
		this.tokenStorageService.signout();
		window.location.reload();
	}
}
