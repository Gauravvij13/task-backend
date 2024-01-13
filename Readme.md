To run this project :

1. Take pull from main branch & run "npm install" to install all dependency.
2. For setup mongodb atlas you have to replace username & password with your credentials in .env file.
3. Default PORT is 8000 you can change it by updating in .env file
4. Script to start : npm run dev
   

Backend routes:

1. Signup :            (POST)   "/api/signup"
2. Login :             (POST)   "/api/login"
3. All Users:          (GET)    "/"
4. All Tasks By User:  (GET)    "/"
5. Task Details:       (GET)    "/:taskId"
6. Create Task:        (POST)   "/"
7. Update Task:        (PATCH)  "/:taskId"
8. Update Task Status: (PATCH)  "/:taskId/status"
9. Delete Task:        (DELETE) "/:taskId"           
