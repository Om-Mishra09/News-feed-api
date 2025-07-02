# News-feed-api
This is a RESTful API for managing time-sensitive news items such as announcements, updates, events, or ads. Built with Node.js and Express, it uses file-based JSON storage instead of a database. This makes it lightweight, simple to run locally, and easy to integrate with frontend applications or admin tools.

---

## Features

- Full CRUD (Create, Read, Update, Delete) functionality
- API key authentication for secure operations
- Filter news by type and priority
- Automatically excludes expired news items
- Data persistence using JSON file (`newsData.json`)
- No database required

---

## Tech Stack

- Node.js
- Express.js
- UUID (for generating unique news IDs)
- File System (`fs`) for reading/writing JSON
- Thunder Client (or Postman) for API testing

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/Om-Mishra09/News-feed-api.git
cd News-feed-api

2. Install dependencies

npm install

3. Start the server

node index.js

The server will start at:
http://localhost:3000


## Testing the API with Thunder Client
Install Thunder Client (VS Code Extension)

This project is best tested using [Thunder Client](https://www.thunderclient.com/), a lightweight REST client built into VS Code.

### How to Test Endpoints

1. **Open Thunder Client**
   - Click the ⚡ icon on the left sidebar in VS Code.

2. **Create a New Request**
   - Click "New Request" and set the method (GET, POST, PUT, DELETE).
   - Set the request URL (see endpoint examples below).

3. **For POST, PUT, DELETE**
   - Go to the **Headers** tab and add:
     ```
     Authorization: Bearer my-secret-key
     Content-Type: application/json
     ```
   - Then go to the **Body** tab and choose `JSON`.

---

### Example Requests in Thunder Client

#### ➕ Create News (POST /news)

- Method: `POST`
- URL: `http://localhost:3000/news`
- Body (JSON):
json
{
  "title": "System Maintenance",
  "content": "The system will be down at 2 AM.",
  "type": "announcement",
  "published_at": "2025-07-01T10:00:00Z",
  "expires_at": "2025-07-05T10:00:00Z",
  "priority": 1,
  "image_url": "",
  "created_by": "admin"
}

#### Get All News (GET /news)

Method: GET
URL: http://localhost:3000/news

Optional filters:
http://localhost:3000/news?type=announcement&priority=2

#### Get News by ID (GET /news/:id)
Method: GET

URL: http://localhost:3000/news/<your-news-id>

Replace <your-news-id> with a valid ID returned from the POST request.

#### Update News (PUT /news/:id)
Method: PUT

URL: http://localhost:3000/news/<your-news-id>

Body (JSON):
{
  "title": "Updated Maintenance Time",
  "priority": 3
}

#### Delete News (DELETE /news/:id)
Method: DELETE

URL: http://localhost:3000/news/<your-news-id>

#### Note

All POST, PUT, and DELETE requests must include the Authorization header:
Authorization: Bearer my-secret-key
The server must be running locally on http://localhost:3000.

Thunder Client saves your requests — you can organize them into a collection for easy reuse.
