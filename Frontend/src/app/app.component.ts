import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { AppState } from './store/app.state';
import { toggleAuth } from './store/shared/actions/shared.actions';
import {
	getAuthState,
	getLoading,
} from './store/shared/selectors/shared.selector';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'shulgin';
	isLoggedIn: Observable<boolean>;
	isLoading: Observable<boolean>;

	constructor(
		private storageService: StorageService,
		private store: Store<AppState>
	) {
		this.isLoading = this.store.select(getLoading);
		this.isLoggedIn = this.store.select(getAuthState);
	}

	ngOnInit(): void {
		if (this.storageService.getToken()) {
			this.store.dispatch(toggleAuth({ status: true }));
		}
		this.isLoading = this.store.select(getLoading);
	}
}
