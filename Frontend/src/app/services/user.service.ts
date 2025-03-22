import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:5277/api/users'; // adjust URL if needed

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl);
    }

    createUser(user: User): Observable<User> {
      return this.http.post<User>(this.apiUrl, user);
    }
}
