// route.guard.ts
import {Injectable} from '@angular/core';
import {CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({
    providedIn:'root'
})

export class RouteGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser=localStorage.getItem("user_id");
          if (currentUser) {
            console.log("Checked Login Data true");
            return true;
        }
        console.log("Checked Login Data false");
        // return true;
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}