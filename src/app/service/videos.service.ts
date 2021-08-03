import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'videos';

@Injectable({
    providedIn:'root'
})

export class videosservice{

    constructor(private http:HttpClient){}

    getvideos():Observable<any[]>{
        return this.http.get<any[]>(api+`/getvideos`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getvideosbyid(vid:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getvideosbyid/`+vid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createvideos(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createvideos`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updatevideos(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatevideos`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deletevideos(vid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletevideos/`+vid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}