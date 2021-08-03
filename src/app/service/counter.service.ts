import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'counter';

@Injectable({
    providedIn:'root'
})

export class counterservice{

    constructor(private http:HttpClient){}

    getCounter():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createCounter(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getCounterById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    UpdateCounter(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    DeleteCounter(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/delete/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}