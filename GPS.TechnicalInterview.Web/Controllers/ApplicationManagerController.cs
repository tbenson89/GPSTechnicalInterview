using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using GPS.ApplicationManager.Web.Models;

namespace GPS.ApplicationManager.Web.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApplicationManagerController : ControllerBase
    {
        private readonly ILogger<ApplicationManagerController> _logger;

        public ApplicationManagerController(ILogger<ApplicationManagerController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        ///     GET: Gets All the applications. '/api/applications'
        /// </summary>
        /// <returns>All the Applications in the JSON File/mockDB</returns>
        [HttpGet]
        [Route("application")]
        public ActionResult<IEnumerable<LoanApplication>> GetAllApplications()
        {
            try
            {
                var applications = LoanApplicationHelper.LoadApplications();

                return Ok(applications);
            } catch (Exception ex)
            {
                // Log the exception or handle it as needed
                _logger.LogError(ex, "An error occurred while loading applications.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while loading applications.");
            }

        }

        /// <summary>
        ///     POST: Creates a new application. '/api/application'
        /// </summary>
        /// <param name="application">The application object to create.</param>
        /// <returns>The newly created application object.</returns>
        [HttpPost]
        [Route("application")]
        public IActionResult CreateApplication(LoanApplication application)
        {
            try
            {
                var applications = LoanApplicationHelper.LoadApplications();

                // Check if the application number already exists
                bool applicationExists = applications.Any(a => a.ApplicationNumber == application.ApplicationNumber);
                if (applicationExists)
                {
                    return BadRequest("Application number already exists. Update application number and try again.");
                }

                applications.Add(application);

                LoanApplicationHelper.SaveApplications(applications);

                return Ok(applications);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                _logger.LogError(ex, "An error occurred while creating the application.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the application.");
            }
        }

        /// <summary>
        ///     PUT: Updates a loan application. '/api/application'
        /// </summary>
        /// <param name="application">The loan application to update.</param>
        /// <returns>The List of updated applications.</returns>
        [HttpPut]
        [Route("application")]
        public ObjectResult UpdateApplication(LoanApplication application)
        {
            try
            {
                // Find the existing application by application number
                var applications = LoanApplicationHelper.LoadApplications();
                var existingApplication = applications.FirstOrDefault(app => app.ApplicationNumber == application.ApplicationNumber);

                if (existingApplication == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred: Failed to update the application. Application not found.");
                }

                // Update the application with the new data!
                existingApplication.LoanTerms = application.LoanTerms;
                existingApplication.PersonalInfo = application.PersonalInfo;
                existingApplication.DateApplied = application.DateApplied;
                existingApplication.Status = application.Status;

                // SAVE json
                applications.Append(application);

                LoanApplicationHelper.SaveApplications(applications);

                return Ok(applications);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                _logger.LogError(ex, "An error occurred while updating the application.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the application.");
            }
        }


        /// <summary>
        ///     DELETE: Deletes an application by applicationNumber. '/api/applications/{applicationNumber}'
        /// </summary>
        /// <param name="application">The application Number of the application to delete.</param>
        /// <returns>The updated list of applications without the deleted application</returns>
        [HttpDelete]
        [Route("application/{applicationNumber}")]
        public IActionResult DeleteApplication(string applicationNumber)
        {
            try
            {
                var applications = LoanApplicationHelper.LoadApplications();
                var application = applications.FirstOrDefault(app => app.ApplicationNumber == applicationNumber);
                if (application == null)
                {
                    return NotFound();
                }

                applications.Remove(application);

                LoanApplicationHelper.SaveApplications(applications);

                return Ok(applications);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                _logger.LogError(ex, "An error occurred while deleting the application.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the application.");
            }
        }
    }
}
