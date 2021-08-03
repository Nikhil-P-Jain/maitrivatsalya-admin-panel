import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'userPermission';
// const api = 'http://localhost:3000/api/product';

@Injectable({
    providedIn:'root'
})

export class userPermissionService{

    constructor(private http:HttpClient){}

    getUserPermission():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createUserPermission(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deleteUserPermission(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/delete/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getERPlinkPermission():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/erpLink`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createERPlinkPermission(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/erpLink/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createERPlinkUser(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/erpLink/createLink`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deleteERPlinkPermission(id:any):Observable<any[]>{
        return this.http.delete<any[]>(`http://localhost:3000/api/erpLink/delete/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getUser(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getERPLinkedUser():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/erplink/linkUser`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getERPNotLinkUser():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/erplink/notlinkUser`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getERPUser():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/erpLink/ERP`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}