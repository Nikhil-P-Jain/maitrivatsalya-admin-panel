import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'activities';

@Injectable({
    providedIn:'root'
})

export class activityservice{

    constructor(private http:HttpClient){}

    getActivity():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createActivity(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getActivityById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    UpdateActivity(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    DeleteActivity(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/delete/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}