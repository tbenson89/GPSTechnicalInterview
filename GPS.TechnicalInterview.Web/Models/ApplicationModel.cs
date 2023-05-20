using System;

namespace GPS.ApplicationManager.Web.Models
{
    public class LoanApplication
    {
        public string ApplicationNumber { get; set; }
        public LoanTerms LoanTerms { get; set; }
        public PersonalInfo PersonalInfo { get; set; }
        public DateTime DateApplied { get; set; }
        public string Status { get; set; }
    }

    public class LoanTerms
    {
        public decimal Amount { get; set; }
        public decimal MonthlyPaymentAmount { get; set; }
        public int Term { get; set; }
    }

    public class PersonalInfo
    {
        public FullName FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }

    public class FullName
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
