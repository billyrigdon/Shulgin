import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://127.0.0.1/api/protected/';
const headers = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
	providedIn: 'root',
})
export class DrugService {
	constructor(private http: HttpClient) {}

	getDrugs() {
		return this.http.get(API_URL + 'drug', {
			responseType: 'text',
		});
	}

	addUserDrug(drugName: string) {
		return this.http.post(
			API_URL + '/user/drug/add',
			{ name: drugName },
			headers
		);
	}
}
