import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8080/api/protected/';

@Injectable({
	providedIn: 'root',
})
export class StoryService {
	constructor(private http: HttpClient) {}

	getUserStories(userId: number): Observable<any> {
		return this.http.get(
			API_URL + 'story/user?userId=' + userId.toString(),
			{
				responseType: 'text',
			}
		);
	}
}
