import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'customer';

@Injectable({
    providedIn:'root'
})

export class customerService{

    constructor(private http:HttpClient){}

    getCustomer():Observable<any[]>{
        return this.http.get<any[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createCustomer(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getCustomerById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateCustomer(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getIndustry():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/industry`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getTerritory():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/territory`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    findCustomer(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/find/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delCustomer(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/changeStatus`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getCustomerByStatus(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/status/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}