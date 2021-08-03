import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'aboutus';

@Injectable({
    providedIn:'root'
})

export class aboutservice{

    constructor(private http:HttpClient){}

    getAboutUs():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createAboutUs(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getAboutUsById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    UpdateAboutUs(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    DeleteAboutUs(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/delete/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}