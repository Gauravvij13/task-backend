To run this project :

1. Take pull from main branch & run "npm install" to install all dependency.
2. For setup mongodb atlas you have to replace username & password with your credentials in .env file.
3. Default PORT is 8000 you can change it by updating in .env file
4. Script to start : npm run dev
   

Backend routes:

1. Signup :            (POST)   "/api/users/signup"
2. Login :             (POST)   "/api/users/login"
3. All Users:          (GET)    "/api/users"
4. All Tasks By User:  (GET)    "/api/tasks"
5. Task Details:       (GET)    "/api/tasks/:taskId"
6. Create Task:        (POST)   "/api/tasks"
7. Update Task:        (PATCH)  "/api/tasks/:taskId"
8. Update Task Status: (PATCH)  "/api/tasks/:taskId/status"
9. Delete Task:        (DELETE) "/api/tasks/:taskId"           
