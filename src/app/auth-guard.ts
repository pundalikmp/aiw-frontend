import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router){
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        console.log('sessionStorage.getItem', sessionStorage.getItem('username'));
        
        if (!sessionStorage.getItem('username')) {
            this.router.navigate(['login']);
            return false;
        } else {
            return true;
        }
    }
}
