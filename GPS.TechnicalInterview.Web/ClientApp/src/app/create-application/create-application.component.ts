import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanApplication } from '../models/loan-application.model';

// Note: I battled between numeric ValidatorFN and different formatting requirments
// I ran out of time and went with the best option I had going. IF had more time
// I would fix the currency format pipe and get it working and validate it using that
// Custom validator function to check if the value is numeric with dashes allowed
// I would love to discuss the companies coding standards in this regard
const numericValidator: ValidatorFn = (control: FormControl) => {
  const value = control.value;
  if (value && !/^[0-9.-]+$/.test(value)) {
    return { numeric: true }; // return an error object if the value is not numeric
  }
  return null; // return null if the value is valid
};

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  public applicationForm: FormGroup;
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];
  public mode: string; // Keep track of the viewModes/states
  public currentApplication: LoanApplication;
  public errorMessage: string = '';
  public submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.applicationForm = this.formBuilder.group({
      applicationNumber: new FormControl('', [Validators.required, numericValidator]),
      loanTerms: this.formBuilder.group({
        amount: new FormControl('', [Validators.required, numericValidator]),
        monthlyPaymentAmount: new FormControl({value: '', disabled: true}),
        term: new FormControl('', [Validators.required, numericValidator]),
      }),
      personalInfo: this.formBuilder.group({
        fullName: this.formBuilder.group({
          firstName: new FormControl('', [Validators.required]),
          lastName: new FormControl('', [Validators.required]),
        }),
        phoneNumber: ['', [Validators.pattern(/^(\d{10}|\d{3}-\d{3}-\d{4})$/)]],
        email: ['', [Validators.email]],
      }),
      dateApplied: [new Date()],
      status: ['New'],
    });

    // Set the default mode to "CREATE"
    this.mode = 'CREATE';
  }

  ngOnInit(): void {
    // Check if application data exists in state
    const stateData = history.state;
    if (stateData && stateData.application) {
      this.mode = 'EDIT'; // If application data exists, set the mode to "EDIT"

      // IF: EDIT mode disable application number Input element
      if (this.mode === 'EDIT') {
        const applicationNumber = this.applicationForm.get('applicationNumber').value;
        this.applicationForm.get('applicationNumber').disable();
        this.applicationForm.patchValue({
          applicationNumber: applicationNumber,
        });
      }

      this.populateForm(stateData.application);
    }
  }

  // EDIT: Populate the form fields with the application data
  populateForm(application: LoanApplication) {
    this.applicationForm.patchValue({
      applicationNumber: application.applicationNumber,
      loanTerms: {
        amount: application.loanTerms.amount,
        monthlyPaymentAmount: application.loanTerms.monthlyPaymentAmount,
        term: application.loanTerms.term,
      },
      personalInfo: {
        fullName: {
          firstName: application.personalInfo.fullName.firstName,
          lastName: application.personalInfo.fullName.lastName,
        },
        phoneNumber: application.personalInfo.phoneNumber,
        email: application.personalInfo.email,
      },
      dateApplied: application.dateApplied,
      status: application.status,
    });
  }

  submitApplication() {
    if (this.applicationForm.invalid) {
      this.submitted = true;
      return;
    }
    const applicationNumber = this.applicationForm.get('applicationNumber').value;
    const application: LoanApplication = {
      applicationNumber: applicationNumber,
      loanTerms: {
        amount: this.applicationForm.value.loanTerms.amount,
        monthlyPaymentAmount: this.applicationForm.value.loanTerms.monthlyPaymentAmount,
        term: this.applicationForm.value.loanTerms.term,
      },
      personalInfo: {
        fullName: {
          firstName: this.applicationForm.value.personalInfo.fullName.firstName,
          lastName: this.applicationForm.value.personalInfo.fullName.lastName,
        },
        phoneNumber: this.applicationForm.value.personalInfo.phoneNumber,
        email: this.applicationForm.value.personalInfo.email,
      },
      dateApplied: this.applicationForm.value.dateApplied,
      status: this.applicationForm.value.status,
    }
    if (application && this.applicationForm.valid) {
      if (this.mode === 'CREATE') {
        // Pass the newly created Application -> API call
        this.service.createApplication(application).subscribe(
          (res) => {
            this.openSnackBar("Created Succcessfully", "OK");
            this.applicationForm.reset();
            // Navigate back to the applications page
            this.router.navigate(["/applications"]);
          },
          (e) => {
            console.error(e.error);
            this.openSnackBar(e.error, "OK");
          }
        );
      } else if (this.mode === 'EDIT') {
        // Update the application using the API call
        const updatedApplication = { ...this.currentApplication, ...application };
        this.service.updateApplication(updatedApplication).subscribe(res => {
          this.openSnackBar('Saved Successfully', 'OK');
          this.applicationForm.reset();
          this.router.navigate(['/applications']);
        });
      } else {
          // There was an error revertback
          this.router.navigate(['/']);
      }
    } else {
      this.errorMessage = '** Please fill out the required fields **';
    }
  }

  updateMonthlyPaymentAmount() {
    const amount = this.applicationForm.value.loanTerms.amount;
    const term = this.applicationForm.value.loanTerms.term;
    const monthlyPaymentAmount = (amount / term).toFixed(2);

    // Update the value of MonthlyPaymentAmount field
    this.applicationForm.patchValue({
      loanTerms: {
        monthlyPaymentAmount: monthlyPaymentAmount
      }
    });
  }

  // Note: If i had more time I would redo this W/O the nested elseIf's X6
  // There is a far better way to do this using switch: switch(fieldPath)
  getErrorMessage(fieldPath: string): string {
    if (fieldPath === 'personalInfo.fullName.firstName') {
      const control = this.applicationForm.get(fieldPath);
      if (control.errors?.required) {
        return '* First Name is required.';
      }
    }
    else if (fieldPath === 'personalInfo.fullName.lastName') {
      const control = this.applicationForm.get(fieldPath);
      if (control.errors?.required) {
        return '* Last Name is required.';
      }
    }
    else if (fieldPath === 'personalInfo.phoneNumber') {
      return '* Invalid Phone Number.';
    }
    else if (fieldPath === 'personalInfo.email') {
      return '* Invalid Email Address.';
    }
    else if (fieldPath === 'applicationNumber') {
      const control = this.applicationForm.get(fieldPath);
      if (control.errors?.required) {
        return '* Application Number is Required.';
      } else {
        return '* Application Number must be a Number.';
      }
    }
    else if (fieldPath === 'loanTerms.amount') {
      const control = this.applicationForm.get(fieldPath);
      if (control.errors?.required) {
        return '* Application Amount is Required.';
      } else {
        return '* Application Amount must be a Number.';
      }
    }
    else if (fieldPath === 'loanTerms.term') {
      const control = this.applicationForm.get(fieldPath);
      if (control.errors?.required) {
        return '* Application Term is Required.';
      } else {
        return '* Application Term must be a Number [24, 48, 60, 72, 84).';
      }
    }
    return '* Invalid Entry';
  }

  isFieldInvalid(fieldPath: string): boolean {
    const control = this.applicationForm.get(fieldPath);
    return control.invalid && (control.touched || control.dirty || this.submitted);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
