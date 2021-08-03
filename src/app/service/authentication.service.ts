import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'auth/check';
// const forgotPass = environment.Base_Url + 'forgotPass';
// const change_pass = environment.Base_Url + 'change_password';

@Injectable({
    providedIn:'root'
})

export class LoginService{
    user:any;
    per:any=[];

    constructor(private http:HttpClient){}

    login(body:any):Observable<any[]>{
        console.log("User Login :-", body);
        return this.http.post<any[]>(api+"/",body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .pipe(map(res => {
            // login successful if there's a jwt token in the response
            this.user = res;
            console.log("Geeting USer Data :-", this.user);
            if (this.user) {
                localStorage.setItem('user_id', this.user.userId);
                localStorage.setItem('user_name', this.user.username);
                localStorage.setItem('user_type',this.user.user_type);
            }
            return res;
        }));
    }

    changePass(body:any):Observable<any[]>{
        return this.http.post<any[]>(environment.Base_Url+'register/changepassword/',body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res=>res);
    }

    // forgotPass(body:any):Observable<any[]>{
    //     return this.http.post<any[]>(forgotPass,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    //     .map(res=>res);
    // }

    // isPunchIn(body:any):Observable<any[]>{
    //     return this.http.patch<any[]>(`http://localhost:3000/api/attendance/isPunchedIn`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    //     .map(res=>res);
    // }

    // getTrackingDetail(body:any):Observable<any[]>{
    //     return this.http.patch<any[]>(`http://localhost:3000/api/tracking/find`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    //     .map(res=>res);
    // }
}