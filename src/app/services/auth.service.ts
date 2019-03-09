import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    constructor(private http:HttpClient, private router:Router){}
    localStorage:Storage;
    uri='http://localhost:8080/users';
    currentUser:any={};
    checkUser():any{
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(this.currentUser){
            let token = {token:'Bearer '+this.currentUser.token};
            return this.isTokenValid(token);
    }
    else{
        this.router.navigate(['/login']);
        
    }
        
}
    isTokenValid(token){
       return this.http.post<boolean>(`${this.uri}/authenticate`,token);
}


}