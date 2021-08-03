import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'expense_head';
// const api = 'http://localhost:3000/api/expense_head';

@Injectable({
    providedIn:'root'
})

export class expenseHeadService{

    constructor(private http:HttpClient){}

    getExpenseHead(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/all/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createExpenseHead(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createExpenseHeadArray(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createArray`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseHeadById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateExpenseHead(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    delExpenseHead(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/changeStatus`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}