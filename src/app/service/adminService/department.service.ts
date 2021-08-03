import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'department';
// const api = 'http://localhost:3000/api/department';

@Injectable({
    providedIn:'root'
})

export class departmentService{

    constructor(private http:HttpClient){}

    getDepartment(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/all/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createDepartment(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createDepartmentArray(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createArray`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getDepartmentById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateDepartment(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delDepartment(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/dept`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}