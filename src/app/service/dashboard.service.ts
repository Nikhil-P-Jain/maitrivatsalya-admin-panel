import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

const api = environment.Base_Url + 'state';

@Injectable({
    providedIn:'root'
})

export class dashboardService{

    constructor(private http:HttpClient){}

    getAllState(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/getstate/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getDist(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/getdist/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getDevice(body:any):Observable<any[]>{
        return this.http.post<any[]>(environment.Base_Url+`device/getdeviceid/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getDeviceDate(body:any):Observable<any[]>{
        return this.http.post<any[]>(environment.Base_Url+`device/devicedata/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getHistoricalDate(body:any):Observable<any[]>{
        return this.http.post<any[]>(environment.Base_Url+`device/historical/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getUnregisteredDevice():Observable<any[]>{
        return this.http.get<any[]>(environment.Base_Url+`sites/unregister/`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getSummaryData(body:any):Observable<any[]>{
        return this.http.post<any[]>(environment.Base_Url+`summary/datetodate/`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }
}