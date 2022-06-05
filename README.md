https://cool-ganache-3a1616.netlify.app/

The task applied to communication with the API and simple validation. The project was set up with npx create-reactor-app. I used the AXIOS library to communicate with the API. I handled Input fields in the form by writing custom-hook (input-hook). The form can be sent only if all required fields are correctly filled in. I have created a modal to display information about an error or a success, which is displayed in the place selected with the help of the portal. In case of success, I used two libraries:
- react-confetti for the confetti effect 🙂
- react-use for easy access to height and width of the Window.
In case of error: displaying error information.
The application is responsive through the use of rem units and mediaQuery. The API has a validation error - although we send a number, we can get an error 400 and the answer will be:
Slice_of_bread: "should be a number"
no_of_slices: "should be a number"
diameter: "should be a number”. 
An error will appear when the number is too large. We can get rid of this error by setting the maximum value in the input field. 
It took me 10-12 hours to complete the project.
