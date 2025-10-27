# Todo List Application 📝

Hey there! Welcome to my Todo List project. This is a full-stack web application I built to help people manage their daily tasks efficiently. I'm excited to share it with you!

## What This Project Is About 💡

You know how sometimes we all struggle to keep track of our tasks? Well, I created this application to solve that problem. It's a simple yet powerful task management system where users can:

- Create an account and securely log in
- Add tasks they need to complete
- Mark tasks as done when finished
- Keep track of their progress with a visual progress bar
- Delete tasks they no longer need

## Technologies I Used 🛠️

I chose these technologies because they're industry-standard and powerful:

**Backend (The Brain):**
- Java 17 & Spring Boot - For building a robust REST API
- Spring Security - To keep user data safe
- MySQL - For storing all the user and task data
- JWT (JSON Web Tokens) - For secure authentication
- Lombok - To write cleaner code

**Frontend (The Face):**
- React with Vite - For a fast and modern user interface
- Tailwind CSS - For beautiful, responsive styling
- Axios - For talking to the backend
- React Router - For smooth page navigation
- Lucide Icons - For nice visual elements

## How to Run This Project 🚀

Just follow these steps:

### Step 1: Get the Code

### Step 2: Set Up the Database

First, make sure you have MySQL installed. Then create a database named todolist_db:

### Step 3: Configure the Backend

Open `backend/src/main/resources/application.properties` and update these lines with your MySQL details:

properties
spring.datasource.url=jdbc:mysql://localhost:3306/todolist_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
app.jwt.secret=yourSuperSecretKeyShouldBeAtLeast32CharsLong

### Step 4: Start the Backend
For that you can use some IDE like Intelij

Wait for it to start... You should see something like "Started BackendApplication in X seconds". The API will be running on `http://localhost:8080`

### Step 5: Set Up the Frontend

Open a new terminal window:

cd frontend
npm install

Create a `.env` file in the frontend folder:

env
VITE_API_BASE_URL=http://localhost:8080/api


### Step 6: Start the Frontend

Now open your browser and go to `http://localhost:5173` - You should see the login page! 🎉

## How to Use the App

1. **First Time?** Click "Sign up" and create an account with your name, email, and password
2. **Already Have an Account?** Just sign in with your email and password
3. **Add Your First Task** - Type in a task title (like "Buy groceries") and optionally add a description
4. **Managing Tasks:**
   - Click the checkbox to mark a task as complete
   - Hover over a task to see the delete button
   - Watch your progress bar fill up as you complete tasks!
5. **When You're Done** - Click the logout button to sign out securely

## Project Structure 📂

Here's how I organized everything:

tharuksham-todo-list/
├── backend/                    # All the server-side code
│   ├── controller/            # API endpoints
│   ├── service/               # Business logic
│   ├── repository/            # Database access
│   ├── model/                 # Data models (User, Todo)
│   ├── security/              # JWT and authentication
│   └── dto/                   # Data transfer objects
└── frontend/                   # All the client-side code
    ├── pages/                 # LoginSignup and TodoList pages
    ├── components/            # Reusable components
    └── services/              # API call functions


## API Endpoints

Here's what the backend can do:

**Authentication:**
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Log in and get a token

**Todo Management (requires authentication):**
- `GET /api/todolist/items` - Get your latest 5 tasks
- `POST /api/todolist/additem` - Add a new task
- `PUT /api/todolist/item/{id}` - Update a task
- `DELETE /api/todolist/item/{id}` - Delete a task
- `PATCH /api/todolist/item/{id}/toggle` - Mark task as complete/incomplete

## Testing the App 🧪

Want to test it out? Here's a quick scenario:

1. Register with email: `test@example.com`, password: `password123`
2. Add a task: "Complete the assessment"
3. Add another: "Review the code"
4. Mark one as complete
5. Watch the progress bar update!
6. Delete a task
7. Log out and log back in - your tasks are still there!

*P.S. - If something doesn't work as expected, please let me know. I'm always learning and improving!*