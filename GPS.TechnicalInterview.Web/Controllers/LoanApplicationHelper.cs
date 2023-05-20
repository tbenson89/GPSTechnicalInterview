using System.Collections.Generic;
using GPS.ApplicationManager.Web.Models;
using Newtonsoft.Json;

namespace GPS.ApplicationManager.Web.Controllers
{
    public static class LoanApplicationHelper
    {
        public static List<LoanApplication> LoadApplications()
        {
            // Read the JSON from the file
            string jsonData = System.IO.File.ReadAllText("loanApplication.json");
            return JsonConvert.DeserializeObject<List<LoanApplication>>(jsonData);
        }

        public static void SaveApplications(List<LoanApplication> applications)
        {
            // Save the JSON string to a file
            System.IO.File.WriteAllText("loanApplication.json", JsonConvert.SerializeObject(applications));
        }
    }
}