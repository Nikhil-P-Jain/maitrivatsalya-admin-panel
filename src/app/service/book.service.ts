import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'book';

@Injectable({
    providedIn:'root'
})

export class bookservice{

    constructor(private http:HttpClient){}

    getbook():Observable<any[]>{
        return this.http.get<any[]>(api+`/getbook`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getbookbyid(bid:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getbookbyid/`+bid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createbook(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createbook`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updatebook(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatebook`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deletebook(bid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletebook/`+bid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}