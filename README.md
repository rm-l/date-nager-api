Steps to Run the Application

Clone the Repository:
On your terminal Run `git clone https://github.com/rm-l/date-nager-api`.

Install Backend Dependencies:
Navigate to the backend folder and run `npm install`.

Install Frontend Dependencies:
Go back to the root folder and run `npm install`.

Setup Environment Variables:
Rename `.env.example` to `.env` (Both backend and on Root - Since the application does not have any sensitive information, it will be ready to use.)

Run Backend:
Open a terminal, navigate to the backend folder, and start the backend server with `npm start`. By default, this will run on port 3010 as configured in the .env file(where you can change if you want to).

Run Frontend:
Open another terminal, navigate to the root folder of the project, and start the frontend server with `npm run dev`. By default, this will run on port 3000.
(if you need to change the default port for the frontend application, update the `package.json` file on the Root directory).


Accessing the Application:
Open your browser and navigate to http://localhost:3000 (or the port you configured).