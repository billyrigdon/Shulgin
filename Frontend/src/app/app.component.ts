import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'shulgin';
	isLoggedIn = false;

	constructor(private storageService: StorageService) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.storageService.getToken();
	}
}
