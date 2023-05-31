<div align="center">
    <img src="https://media.discordapp.net/attachments/1108395807251648554/1113520131004453034/logo.png?width=1440&height=651" style="background-color: black;"/>
</div>

# GPS.ApplicationManager.Web Tyler's Loan Application

This project is a loan application tool built with .NET, Angular and Material. The user interface features a custom design that is visually appealing and user-friendly. Users can create, edit, and delete applications.

## Sample Data

Copy sample data from `/loanApplication_Sample.json` to `/loanApplication.json` (if you want to start with sample data or you can start by the default seed data)

## Areas for Improvement

While working on the Loan Application project, there are a few areas where I believe I could have made further improvements had I had more time:

1. **Utilizing async/await and promises**: I would revise the loadApplications() function to leverage async/await and utilize promises/catch() for better error handling and to showcase my proficiency in creating asynchronous applications.
    - I would also utilize the async | pipe and $streams - to avoid memory leaks and eliminate the need for manual subscription management in ngOnDestroy. This eliminates the need to manually unsubscribe in the ngOnDestroy lifecycle hook, resulting in cleaner and more efficient code.
2. **Enhancing error message logic**: I would improve the logic for displaying error messages by making it more dynamic and cleaner. Instead of nesting multiple else if statements, I would store error messages in an array and loop/map through them to extract and display only the relevant validation errors for each form control.
3. **Strengthening validators**: I would improve the validators by addressing the conflicting currency and numeric validation issue and enhancing server-side validation. This would ensure more accurate data validation and enhance the application's reliability.
4. **Implementing search functionality**: I had the ambition to go above and beyond the requirements and implement search functionality. Unfortunately, due to time constraints, I was unable to fully complete this feature. Given more time, I would have implemented a search functionality that allows users to easily search and filter loan applications.

While I acknowledge these areas for improvement, I believe that the Loan Application showcases my abilities and demonstrates my dedication to delivering high-quality code. While being adaptable to different coding standards and practices.

## Feedback and Support

If you encounter any issues or have any suggestions for improvement, please feel free to let me know how I can improve. I value your feedback and will actively work towards addressing any concerns you may have.
