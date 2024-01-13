To run this project :

1. Take pull from main branch & run "npm install" to install all dependency.
2. For setup mongodb atlas you have to replace username & password with your credentials in .env file.
3. Default PORT is 8000 you can change it by updating in .env file
4. Script to start : npm run dev
   

Backend routes:

Signup :            (POST)   "/api/signup" 
Login :             (POST)   "/api/login"
All Users:          (GET)    "/"
All Tasks By User:  (GET)    "/"
Task Details:       (GET)    "/:taskId"
Create Task:        (POST)   "/"
Update Task:        (PATCH)  "/:taskId"
Update Task Status: (PATCH)  "/:taskId/status"
Delete Task:        (DELETE) "/:taskId"           
