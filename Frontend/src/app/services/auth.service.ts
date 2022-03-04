import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_IP } from "./url";

const API_URL = API_IP + "api/public";

const headers = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(private http: HttpClient) {

	}

	login(email: string, password: string): Observable<any>{
		return this.http.post(API_URL + "/login", {
			email,
			password
		},headers)
	}

	signup(username: string, email: string, password: string): Observable<any> {
		return this.http.post(API_URL + "/signup", {
			username,
			email,
			password
		},headers)
	}
}