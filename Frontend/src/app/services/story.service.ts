import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../types/story';

const API_URL = 'http://127.0.0.1:8080/api/protected/';
const headers = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
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

	addUserStory(story: Story) {
		return this.http.post(API_URL + 'story/create', story, headers);
	}
}
