import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'visit';
// const api="http://localhost:3000/api/visit";
@Injectable({
    providedIn:'root'
})

export class visitService{

    constructor(private http:HttpClient){}

    getVisit():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    createVisit(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateVisit(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVistByUserId(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/users/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getvisitByFilter(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/find`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitByCustId(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/completedVisit`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getCurrentVisit(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/currentVisit`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getUser(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}