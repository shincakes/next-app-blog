# Blog Site Documentation

## 📝 **Overview**

This project consists of two main parts:

1. **Backend**: A Flask-based REST API that interacts with a PostgreSQL database.
2. **Frontend**: A Next.js application for displaying and interacting with blog posts.

The application is containerized using Docker and managed with Docker Compose, providing an easy setup for development and deployment. PostgreSQL is used as the database for storing blog posts.

## ⚡ Quick Setup

Run the following to start:

Pre-requisites
- Docker Desktop
- Git
- Python 


### **1. Clone the Repository**
Clone the repository to your local machine:
```bash
git clone 
cd <repository-name>
```

### **2. Give permission to the shell script**
Give executable permission to the init.sh script:
bash
Copy

```bash
chmod +x init.sh
```

### **3. Execute the Script**
Run the init.sh script:
```bash
./init.sh
```
This will:

- Automatically execute the necessary Docker commands to build and run the containers.
- Generate a .env file (if necessary) based on your environment configuration.
4. Start the Application
Once the script has finished, the application will be up and running. You can access the frontend and backend at the following URLs:

Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/blogs
You should now be able to interact with the blog application and manage blog posts.

---


--- 
## 📡 **API Documentation**

### **Base URL**

- **URL**: `http://localhost:5000/api/blogs`
- **Methods Supported**: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

---

### **1. GET `/api/blogs/`**

- **Description**: Fetch all blog posts, with optional pagination and search by title.
- **Query Parameters**:
    - `page`: (Optional, default: 1) The page number for pagination.
    - `search`: (Optional) The search term to filter blog posts by title.
- **Response**:
    - **200 OK**: Returns a list of blog posts in JSON format.
    - **Example**:

    ```json
    {
        "posts": [
            {
                "id": 1,
                "title": "Blog Post Title",
                "content": "This is the content of the blog post.",
                "created_at": "2025-02-16T10:00:00"
            }
        ],
        "total_pages": 2,
        "current_page": 1
    }
    ```

---

### **2. POST `/api/blogs/`**

- **Description**: Create a new blog post.
- **Request Body**: 
    - `title`: (Required) The title of the blog post.
    - `content`: (Required) The content of the blog post.
- **Response**:
    - **201 Created**: Returns the created blog post with `id` and `created_at`.
    - **Example**:

    ```json
    {
        "id": 1,
        "title": "New Blog Post",
        "content": "This is the content of the new blog post.",
        "created_at": "2025-02-16T10:10:00"
    }
    ```

---

### **3. PUT `/api/blogs/{id}`**

- **Description**: Update an existing blog post by its `id`.
- **Request Body**:
    - `title`: (Required) The updated title of the blog post.
    - `content`: (Required) The updated content of the blog post.
- **Response**:
    - **200 OK**: Returns the updated blog post.
    - **Example**:

    ```json
    {
        "id": 1,
        "title": "Updated Blog Post",
        "content": "This is the updated content of the blog post.",
        "created_at": "2025-02-16T10:00:00"
    }
    ```

---

### **4. DELETE `/api/blogs/{id}`**

- **Description**: Delete a blog post by its `id`.
- **Response**:
    - **200 OK**: Returns a success message.
    - **Example**:

    ```json
    {
        "message": "Blog post deleted successfully."
    }
    ```

---

## 💻 **User Interface Documentation**

The frontend is a **Next.js** application that allows users to view, search, create, edit, and delete blog posts. The frontend interacts with the **Flask API** to manage data.

---

### **Homepage (`/`)**

- **View All Blog Posts**: The homepage displays all blog posts with their `title`, `content`, and `created_at` date.
- **Search Bar**: Users can search for blog posts by title using the search bar at the top of the page.
- **Pagination**: Blog posts are paginated with 5 posts per page. If there are more than 5 posts, users can navigate between pages.

---

### **Blog Post Actions**

- **Edit**: Users can edit a blog post by clicking the "Edit" button next to a post. This opens a modal where users can modify the `title` and `content`.
- **Delete**: Users can delete a blog post by clicking the "Delete" button next to a post. A confirmation modal will appear, and the post will be removed from the list if confirmed.
- **Create New Blog Post**: Users can create a new blog post by clicking the "Create New" button. This opens a modal where they can enter the `title` and `content` of the post.


### **Modals**

- **Create New Blog Post Modal**: A form for entering a new blog post's `title` and `content`. The modal can be accessed by clicking the "Create New" button.
- **Edit Blog Post Modal**: A form pre-filled with the selected post's `title` and `content`. Users can modify these fields and submit the changes.
- **Delete Blog Post Modal**: A confirmation modal that asks the user to confirm the deletion of a blog post.

---

## ⚙️ **Environment Variables**

The project uses `.env` files to configure the database and application environment.


# Running the Application

## 🚀 **Setup via Docker Compose**

### **1. Build and start the containers:**

To start the application, build and run the containers with Docker Compose by using the following command:

```bash
docker-compose up --build
```

This will:

- Build the Docker images for both the backend (Flask API) and frontend (Next.js).
- Start the containers for backend, frontend, and PostgreSQL.
### **2. Access the Application:**
Frontend: Once the containers are up, open your browser and go to http://localhost:3000. This will load the blog site where you can view, create, and manage blog posts.
Backend (API): The API is available at http://localhost:5000/api/blogs. You can use this URL to interact programmatically with the backend.
### **3. Stop the Containers:**
If you need to stop the containers, you can run the following command:

```bash
docker-compose down
```
This will stop and remove the containers, but the data in the PostgreSQL database will persist.

## **🛠️ Running Migrations**
After setting up the containers, you need to ensure the database is up-to-date. Run the database migrations to apply any schema changes:

```bash
docker exec -it blog_backend flask db upgrade
```

This command runs the migrations inside the backend container, ensuring that the PostgreSQL database schema is aligned with the Flask app's requirements.


## **🐘 PostgreSQL Database Setup**
PostgreSQL Configuration
The PostgreSQL database is configured as a Docker service in docker-compose.yml. The environment variables are defined in the .env file.

- User: 
- Password: 
- Database: 

The PostgreSQL database is connected to the Flask API via the DATABASE_URL variable.