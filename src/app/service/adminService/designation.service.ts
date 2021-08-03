import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'designation';

@Injectable({
    providedIn:'root'
})

export class designationService{

    constructor(private http:HttpClient){}

    getDesignation(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/all/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createDesigation(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getDesignationById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateDesignation(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delDesignation(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/changeStatus`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}