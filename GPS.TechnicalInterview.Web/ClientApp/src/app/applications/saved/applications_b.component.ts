import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiServiceB } from './api.service_b-promise';
import { LoanApplication } from '../../models/loan-application.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModalComponent } from '../../components/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-applications_b',
  templateUrl: '../applications.component.html',
  styleUrls: ['../applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
    "options",
  ];
  applications$: Observable<LoanApplication[]> | undefined;

  constructor(
    private service: ApiServiceB,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayApplications();
  }

  displayApplications() {
    // Create stream of ALL applications
    this.applications$ = this.service.getAllApplications();
  }

  searchApplications(input: any) {}

  editClick(application: LoanApplication) {
    // Pass the application data to the edit route using NavigationBehaviorOptions.state
    this.router.navigate(["/edit-application"], { state: { application } });
  }

  // Using promise.then().catch()
  deleteClick(appNum: string) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: "35vw",
      data: { appNum },
    });

    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result) => {
      if (result) {
        this.service.deleteApplication(appNum)
        .then(() => {
          this.openSnackBar("Application Deleted.", "OK");
          this.displayApplications();
        })
        .catch((error) => {
          console.error(`There was an error deleting application number:${appNum}`, error);
          this.openSnackBar(`There was an error deleting application number:${appNum}`, "OK");
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

