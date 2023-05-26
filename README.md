To run the project, first open the terminal and make sure you are in the main folder, domea.

To install all the needed dependencies move first to the frontend folder (cd frontend), and run 'npm install' in the terminal. After the installing is done, move back to the main folder, .. cd, and then move down to backend folder, cd backend and run the same command (npm install).

Before starting up the backend, create an .env file in the root folder (backend), and set up the parameters for your database (our database is hosted by pgAdmin4, and if you're using the same, you will only need to change the master password):

DB_HOST='localhost'
DB_PORT=5432
DB_USERNAME='postgres'
DB_PASSWORD='**\*\*\***'
DB_NAME='domea'

Open 2 terminals. Make sure one is in the frontend folder and run 'npm run expo start', while the other should be in the backend folder and run 'npm run start:dev'.

_IMPORTANT_ In order to make the connection between the frontend and backend work, install ngrok, open the ngrok terminal, run 'ngrok.exe http 3005' and copy the link marked as 'forwarding' into the frontend .env file.

After both the backend and the frontend are up and running, open Postman or Insomnia to populate your newly created database.

To use the app you'll need to create an admin profile, which you will use as priliminary login to the app.

To create an admin profile you will need to send a JSON body object with parameters (use order as set):
"username": email,
"password": string,
"firstname": string,
"lastname": string,
"phone": string,
"address": string,
"zipCode": number,
"city": string

The endpoint is http://localhost:3005/auth/signup-board_member.

Once you get a response with the created admin, open the project in the expo app and use the username and password of the newly created admin profile to successfully log in.

After logging in, you will have the opportunity to create a tenant by using the creation form in the board member interface.

If you would like to log in as a tenant fill out and send in the form, and after successful creation, you can use the 'tenant' username and password to log in and view the tenant/ resident interface.
