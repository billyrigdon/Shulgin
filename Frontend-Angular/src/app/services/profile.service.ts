import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserProfile } from '../types/user';

const API_URL = 'http://127.0.0.1:8080/api/protected/user';
const headers = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private http: HttpClient) {}

	createProfile(userProfile: UserProfile) {
		return this.http.post(API_URL + '/create', userProfile,headers);
	}

	setProfile(userProfile: Object) {
		localStorage.setItem('user', JSON.stringify(userProfile));
	}
}
