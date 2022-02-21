import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDrug } from '../types/userDrug';

const API_URL = 'http://127.0.0.1:8080/api/protected/';
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

	getDrug(drugId: number) {
		return this.http.get(API_URL + 'drug/get?drugId=' + drugId.toString());
	}

	getUserDrugs() {
		return this.http.get(API_URL + 'user/drugs/get', {
			responseType: 'text',
		});
	}

	addUserDrug(userId: number, drugId: number, dosage: string) {
		return this.http.post(
			API_URL + 'user/drugs/add',
			{
				userId,
				drugId,
				dosage,
			},
			headers
		);
	}
}
