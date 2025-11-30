# Blood Bank Management System

This is a full-stack Blood Bank Management System project with a **Node.js + Express backend** and **React frontend**. It allows users to manage blood donors, blood requests, and authentication using JWT.

---

## Project Structure

```
server/
├── controllers/
│   ├── authController.js
│   ├── bloodRequestController.js
│   └── donorController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── BloodRequest.js
│   ├── Donor.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── bloodRequests.js
│   └── donors.js
├── .env
├── server.js
└── package.json

docs/
└── postman_collection.json

client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.js
│   └── index.js
├── package.json
└── tailwind.config.js
```

---

## Setup Instructions

### Backend

1. Navigate to the server folder:
```
cd server
```
2. Install dependencies:
```
npm install
```
3. Create a `.env` file with the following variables:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Start the server:
```
nodemon server.js
```
The backend server will run at `http://localhost:8000`.

### Frontend

1. Navigate to the client folder:
```
cd client
```
2. Install dependencies:
```
npm install
```
3. Start the React development server:
```
npm start
```
The frontend will run at `http://localhost:3000`.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user and return JWT |

### Donors
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | /api/donors         | Get all donors |
| GET    | /api/donors/:id     | Get donor by ID |
| POST   | /api/donors         | Create new donor (protected) |
| PUT    | /api/donors/:id     | Update donor (protected) |
| PATCH  | /api/donors/:id     | Partially update donor (protected) |
| DELETE | /api/donors/:id     | Delete donor (protected) |

### Blood Requests
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | /api/requests           | Get all blood requests |
| GET    | /api/requests/:id       | Get blood request by ID |
| POST   | /api/requests           | Create new blood request (protected) |
| PUT    | /api/requests/:id       | Update blood request (protected) |
| PATCH  | /api/requests/:id       | Partially update request (protected) |
| PATCH  | /api/requests/:id/status| Update status of blood request (protected) |
| DELETE | /api/requests/:id       | Delete blood request (protected) |

---

## Testing

1. Import the provided Postman collection JSON file to test all endpoints.
2. Use the JWT token from login for protected routes.
3. Test all HTTP methods: GET, POST, PUT, PATCH, DELETE.

---

## Features
- JWT-based authentication
- Full CRUD operations for donors and blood requests
- Filter donors and requests by blood group or city
- Server-side validation using `express-validator`
- Custom authentication middleware
- MongoDB persistence via Mongoose
- React frontend using TailwindCSS and React Hooks (`useState`, `useEffect`, `useRef`, `useContext`)
- Responsive design
- React Router DOM for navigation

---

## Third-party Libraries
- Node.js & Express
- Mongoose
- JSON Web Token (jsonwebtoken)
- Express Validator
- Cors & Morgan
- TailwindCSS
- React, React Router DOM

---

## Notes
- Replace `{{token}}`, `{{donorId}}`, and `{{requestId}}` in Postman collection with actual values.
- Make sure MongoDB is running and `.env` variables are correctly set.