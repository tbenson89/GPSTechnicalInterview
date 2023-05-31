import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoanApplication } from '../models/loan-application.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModalComponent } from '../components/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, of } from 'rxjs';
import { catchError, finalize, switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
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
    private service: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayApplications();
  }

  displayApplications():Observable<LoanApplication[]> {
    return this.applications$ = this.service.getAllApplications()
    .pipe(catchError((error) => {
        console.error("Error while fetching applications:", error);
        this.openSnackBar("Error loading applications. Please come back later", "OK");
        return of([]);
      })
    );
  }

  searchApplications(input: any) {
    // TODO: lost the search application logic :(
  }

  editClick(application: LoanApplication) {
    // Pass the application data to the edit route using NavigationBehaviorOptions.state
    this.router.navigate(["/edit-application"], { state: { application } });
  }

  deleteClick(appNum: string) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: "35vw",
      data: { appNum },
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((result) => {
          if (result) {
            return this.service.deleteApplication(appNum).pipe(
              catchError((error) => {
                console.error(`There was an error deleting application number:${appNum}`, error);
                this.openSnackBar(`There was an error deleting application number:${appNum}`, "OK");
                return of(null);
              }),
              finalize(() => {
                this.openSnackBar("Application Deleted.", "OK");
              })
            );
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {
        this.displayApplications();
      },
        (error) => {
          console.error(`Error occurred: ${error}`);
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
