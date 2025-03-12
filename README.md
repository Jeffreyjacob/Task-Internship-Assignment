#clone repo

git clone https://github.com/Jeffreyjacob/Task-Internship-Assignment.git

#Set Up Environment Variables

backend/.env
SECRET_KEY=your-secret-key
DEBUG=True
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
CORS_ALLOWED_ORIGINS=http://localhost:3000

frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

#Running the Project with Docker
docker-compose up --build

#Running Django Backend Locally (Without Docker)
cd backend
python -m venv venv
source venv/bin/activate  
On Windows use venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

#Running Next.js Frontend Locally (Without Docker)
cd frontend
npm install
npm run dev

# API Endpoints

Authentication
POST /api/auth/register/ – Register a new user
POST /api/auth/login/ – Log in and get a JWT token
POST /api/auth/logout/ – Log out

Tasks API
GET /api/tasks/ – List all tasks
POST /api/tasks/ – Create a new task
GET /api/tasks/:id/ – Retrieve a specific task
PUT /api/tasks/:id/ – Update a task
DELETE /api/tasks/:id/ – Delete a task



