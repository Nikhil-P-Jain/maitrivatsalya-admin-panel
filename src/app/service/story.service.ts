import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'story';

@Injectable({
    providedIn:'root'
})

export class storyservice{

    constructor(private http:HttpClient){}

    getstory():Observable<any[]>{
        return this.http.get<any[]>(api+`/getstory`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getstorybyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getstorybyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createstory(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createstory`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updatestory(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatestory`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deletestory(sid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletestory/`+sid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}