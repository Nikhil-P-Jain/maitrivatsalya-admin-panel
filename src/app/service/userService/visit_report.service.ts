import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'visit_report';
const visit_api = environment.Base_Url + 'visit';
// const api = "http://localhost:3000/api/visit_report";
// const visit_api = "http://localhost:3000/api/visit";

@Injectable({
    providedIn:'root'
})

export class visitReportService{

    constructor(private http:HttpClient){}

    getVisitByDate(body:any):Observable<any[]>{
        console.log(body);
        return this.http.patch<any[]>(api+`/findByDate`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitById(id:any):Observable<any[]>{
        return this.http.get<any[]>(visit_api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createVisitReport(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/create`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitByRootUser(body:any):Observable<any[]>{
        console.log("Getting Body Response :-", body);
        return this.http.patch<any[]>(api+`/reports`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getVisitByReportId(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateVisitReport(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/update`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createOutcome(outcome:any):Observable<any[]>{
        return this.http.patch<any[]>(visit_api+`/createOutcome`,outcome,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}