import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoanApplication } from '../models/loan-application.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModalComponent } from '../components/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
    "options",
  ];
  public applications: LoanApplication[] = [];

  constructor(
    private service: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.displayApplications();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  displayApplications() {
    const subscription = this.service.getAllApplications().subscribe((data: LoanApplication[]) => {
      this.applications = data;
    });
    this.subscriptions.push(subscription);

    // Note: IF I had more time: I would utilize async/await, promises, and error handling using catch().
    // This would ensure smoother handling of the API call and potential errors.
    // I would also utilize the async | pipe and $streams - to avoid memory leaks
    // Eliminates the need to manually unsubscribe in the ngOnDestroy lifecycle hook
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const subscription = this.service
          .deleteApplication(appNum)
          .subscribe((data: LoanApplication[]) => {
            this.openSnackBar("Application Deleted.", "OK");
            this.applications = data;
        });
        this.subscriptions.push(subscription);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
