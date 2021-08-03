import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'roles';
// const api = 'http://localhost:3000/api/roles';
@Injectable({
    providedIn:'root'
})

export class rolesService{

    constructor(private http:HttpClient){}

    getRoles():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createRoles(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getRoleById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateRole(body:any):Observable<any[]>{
        console.log("Update Role Request :-", body);
        return this.http.patch<any[]>(api+`/updateRoles`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getTabs():Observable<any[]>{
        return this.http.get<any[]>("http://localhost:3000/api/tabs",{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delRoles(id:any):Observable<any[]>{
        return this.http.patch<any[]>("http://localhost:3000/api/roles/del/"+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}