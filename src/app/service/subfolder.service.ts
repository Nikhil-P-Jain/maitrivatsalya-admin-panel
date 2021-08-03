import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'subfolder';
//const api = 'http://localhost:3000/api/subfolder';


@Injectable({
    providedIn:'root'
})

export class subfolderservice{

    constructor(private http:HttpClient){}

    getsubfolder():Observable<any[]>{
        return this.http.get<any[]>(api+`/getsubfolder`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    getfolder():Observable<any[]>{
        return this.http.get<any[]>(environment.Base_Url+`folder/getfolder`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    getsubfolderbyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getsubfolderbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    createsubfolder(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createsubfolder`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    updatesubfolder(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatesubfolder`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    deletesubfolder(sid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletesubfolder/`+sid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}