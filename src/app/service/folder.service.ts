import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'folder';

//const api = 'http://localhost:3000/api/folder';

@Injectable({
    providedIn:'root'
})

export class folderservice{

    constructor(private http:HttpClient){}

    getfolder():Observable<any[]>{
        return this.http.get<any[]>(api+`/getfolder`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getfolderbyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getfolderbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createfolder(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createfolder`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updatefolder(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updatefolder`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deletefolder(sid:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deletefolder/`+sid,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}