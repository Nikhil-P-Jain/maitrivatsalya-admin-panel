import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'banner';
// const api = "http://localhost:3000/api/user";

@Injectable({
    providedIn:'root'
})

export class UserService{

    constructor(private http:HttpClient){}

    getBanner():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createBanner(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+'/create',body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getBannerById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+'/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateBanner(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+'/update',body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    softDel(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+'/softdel',body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deleteBanner(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+'/delete/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}