import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-user-modal",
  template: `
    <h4>Delete Application</h4>
    <br>
    <p>Are you sure you wish to delete this application?</p>
    <div class="float-right">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button color="primary" (click)="confirm()">Confirm</button>
    </div>
  `,
})
export class UserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appNum: any }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
