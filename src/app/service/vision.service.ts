import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'vision';

@Injectable({
    providedIn:'root'
})

export class visionservice{

    constructor(private http:HttpClient){}

    getvision():Observable<any[]>{
        return this.http.get<any[]>(api+`/getvision`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getvisionbyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getvisionbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createvision(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createvision`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updatevision(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatevision`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deletevision(sid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletevision/`+sid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}