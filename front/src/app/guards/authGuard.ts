import { Injectable } from '@angular/core';
import { CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){};

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean  {
    
    return this.authService.checkUser().pipe(map((res)=>{
        if(res){
            return true;
        }
        else{
            this.router.navigate(['/login']);
        }
    }));
}
}
