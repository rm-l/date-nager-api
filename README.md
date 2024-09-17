# Steps to Run the Application

1. Clone the Repository
In your terminal, run the following command to clone the repository:

`git clone https://github.com/rm-l/date-nager-api`

2. Install Backend Dependencies

Navigate to the backend folder:
`cd backend`

Then, install the dependencies by running:
`npm install`


3. Install Frontend Dependencies

Go back to the root folder:
`cd ..`

Install the frontend dependencies by running:
`npm install`


4. Setup Environment Variables

Rename the environment files in both the backend and root directories:

In the backend folder, rename `.env.example` to `.env`
In the root folder, rename `.env.example` to `.env`

Since the application does not contain sensitive information, no additional configuration is needed.

5. Run the Application

To start both the backend and frontend servers, run the following command in the root folder:

`npm run dev`

By default, the frontend will run on port 3000 and the backend on port 3010.

If you need to change the default ports:
Update the port in the `package.json` for the frontend.
Update the port in the `.env` file for the backend.

6. Access the Application

Once the servers are running, open your browser and navigate to:

`http://localhost:3000`

Or use the port you configured.