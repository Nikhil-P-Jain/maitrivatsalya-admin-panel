import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';
import { officeLocationService } from '../adminService/masterData/officeLocation.service';

const api = environment.Base_Url + 'expense';
// const api= "http://localhost:3000/api/expense";
@Injectable({
    providedIn:'root'
})

export class expense1Service{

    constructor(private http:HttpClient){}

    getExpenseByUserId(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseCat():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/expense_categories`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
    createExpense(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseById(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateExpense(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    approvedExpense(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/expense_status/approve_expense`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    sanctionApproveExpense(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/expense_status/sanctionApprove_expense`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    rejectedExpense(body:any):Observable<any[]>{
        return this.http.post<any[]>(`http://localhost:3000/api/expense_status/reject_expense`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseByReportsUser(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+'/find/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getPending():Observable<any[]>{
        return this.http.get<any[]>(api+`/pending/find`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getReportstoUserByUserId(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/reportsUser/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseHead():Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/expense_head/all/1`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseStatus(id:any):Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/expense_status/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitById(id:any):Observable<any[]>{
        return this.http.get<any[]>(`http://localhost:3000/api/visit/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseStatusId(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/status/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}