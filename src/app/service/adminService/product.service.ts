import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

// const api = environment.Base_Url + 'product';
const api = 'http://apiveritrac.mehtaindia.co.in/api/product';

@Injectable({
    providedIn:'root'
})

export class productService{

    constructor(private http:HttpClient){}

    getProducts(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/all/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createProduct(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createProductArray(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createArray`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getProductById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateProduct(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delProduct(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/changeStatus`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}