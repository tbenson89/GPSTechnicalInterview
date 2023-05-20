import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiService {
    readonly APIUrl = "https://localhost:44343/api";

    constructor(private http: HttpClient) {}

    /* CRUD: Application Service API Calls */
    getAllApplications() { return this.http.get<any>(this.APIUrl+'/application'); }

    createApplication(val:any) { return this.http.post(this.APIUrl+'/application', val); }

    updateApplication(val:any) { return this.http.put(this.APIUrl+'/application', val); }

    deleteApplication(val:any) { return this.http.delete(this.APIUrl+'/application/' + val); }
}