import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoanApplication } from "../../models/loan-application.model";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiServiceB {
    readonly APIUrl = "https://localhost:44343/api/application/";

    constructor(private http: HttpClient) {}

    /* CRUD: Application Service API Calls */
    getAllApplications():Observable<LoanApplication[]> { return this.http.get<LoanApplication[]>(this.APIUrl); }

    createApplication(val:any) { return this.http.post<any>(this.APIUrl, val); }

    searchApplications(val:any): any { return this.http.get<any>(this.APIUrl+'/find', val); }

    updateApplication(val:any) { return this.http.put<any>(this.APIUrl, val); }

    deleteApplication(val:any):Promise<void> { return this.http.delete<void>(this.APIUrl + val).toPromise(); }
}

