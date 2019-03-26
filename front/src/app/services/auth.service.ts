// UNUSED


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
    uri = environment.apiUrl + '/users';
    currentUser: any = {};
    checkUser(): any {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            const token = {token: 'Bearer ' + this.currentUser.token};
            return this.isTokenValid(token);
    } else {
        this.router.navigate(['/login']);

    }

}
    isTokenValid(token) {
       return this.http.post<boolean>(`${this.uri}/authenticate`, token);
}

}
