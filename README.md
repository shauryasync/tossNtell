# 🍽 TossnTell

TossnTell is a full-stack recipe sharing platform where users can create, explore, edit, and manage recipes. It is built as a MERN Stack project focusing on RESTful APIs, authentication, image uploads, and search functionality.

---

## Features

- User Authentication (JWT + HTTP-only Cookies)
- Create Recipe
- Edit Recipe
- Delete Recipe
- View Recipe Details
- Dynamic Ingredients & Instructions
- Cloudinary Image Upload
- Search Recipes
- Filter by Category
- Filter by Difficulty
- User Profile
- Protected Routes
- Responsive Interface

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

---

## Folder Structure

```
client/
server/
```

---

## Installation

### Clone

```bash
git clone https://github.com/shauryasync/tossNtell
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Running the Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Recipes

- GET /api/recipes
- GET /api/recipes/:id
- POST /api/recipes
- PUT /api/recipes/:id
- DELETE /api/recipes/:id

---

## Future Improvements

- Save Recipes
- Recipe Ratings
- Comments
- Pagination
- Advanced Search Filters

---

## Author

**Shaurya**

Built as part of a Full Stack Development Internship using the MERN Stack.
