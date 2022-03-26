import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { AppState } from './store/app.state';
import { getAddCommentsOpen } from './store/comments/comments.selector';
import { setUserId, toggleAuth } from './store/shared/actions/shared.actions';
import {
	getAuthState,
	getLoading,
	getUserId,
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
	addCommentOpen: Observable<boolean>;

	constructor(
		private storageService: StorageService,
		private store: Store<AppState>,
		private router: Router
	) {
		this.isLoading = this.store.select(getLoading);
		this.isLoggedIn = this.store.select(getAuthState);
		this.addCommentOpen = this.store.select(getAddCommentsOpen);
	}

	ngOnInit(): void {
		//Scroll to top of page on route changes
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				document.body.scrollTop = 0;			
			});

		if (this.storageService.getToken()) {
			this.store.dispatch(toggleAuth({ status: true }));
		}

		if (localStorage.getItem('user')) {
			
			//Get userId from user stored in local storage
			let userId = JSON.parse(localStorage.getItem('user') || '').userId;

			//Set global userId
			this.store.dispatch(setUserId({ userId: userId }));
		}

		this.isLoading = this.store.select(getLoading);
	}
}
