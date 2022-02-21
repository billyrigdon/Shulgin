import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USERNAME = 'username';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	signout(): void {
		window.sessionStorage.clear();
	}

	public saveUser(username: string): void {
		window.sessionStorage.removeItem(USERNAME);
		window.sessionStorage.setItem(USERNAME, username);
	}

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY);
	}

	public getUser(): string | null {
		return window.sessionStorage.getItem(USERNAME)
	}
}
