export interface LoanApplication {
  applicationNumber: string;
  loanTerms: LoanTerms;
  personalInfo: PersonalInfo;
  dateApplied: Date;
  status: string;
}

export interface LoanTerms {
  amount: number;
  monthlyPaymentAmount: number;
  term: number;
}

export interface PersonalInfo {
  fullName: FullName;
  phoneNumber: string;
  email: string;
}

export interface FullName {
  firstName: string;
  lastName: string;
}
