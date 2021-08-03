import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'reports';

@Injectable({
    providedIn:'root'
})

export class ReportService{

    constructor(private http:HttpClient){}

    getAllUserAttendance(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/attendance/all`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getUserAttendance(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/attendance/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseByUser(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/expense/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getExpenseByAllUser(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/expense/all`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitByAll(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/visit/all`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitByUser(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/visit/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getReport_user():Observable<any[]>{
        return this.http.get<any[]>(api+`/user`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getMonthAttendanceAll(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/monthAttendance/all`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getMonthAttendanceUser(body):Observable<any[]>{
        return this.http.post<any[]>(api+`/monthAttendance/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getReport_roles():Observable<any[]>{
        return this.http.get<any[]>("http://localhost:3000/api/reports/roles",{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deactiveRootUser(id:any):Observable<any[]>{
        return this.http.get<any[]>("http://localhost:3000/api/user/deactiveRoot/"+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getUserByRootId(id:any):Observable<any[]>{
        return this.http.get<any[]>("http://localhost:3000/api/user/root/"+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getvisitReportByUser(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/visitReport/user`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getvisitReportByAllUser(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/visitReport/all`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getuserTrackingByUserId(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/tracking`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getMonthlyTracking(body):Observable<any[]>{
        return this.http.patch<any[]>(api+`/monthTracking`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}