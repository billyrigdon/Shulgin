import { Injectable } from '@angular/core';
import { API_IP } from './url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewStoryComment } from '../types/comment';
import { Observable } from 'rxjs';

const API_URL = API_IP + 'api/protected';

const headers = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	constructor(private http: HttpClient) {}

	getComments(storyId: number): Observable<any> {
		return this.http.get(API_URL + '/story/comment?storyId=' + storyId);
	}

	addComment(comment: NewStoryComment): Observable<any> {
		return this.http.post(
			API_URL + '/story/comment/create',
			comment,
			headers
		);
	}
}
