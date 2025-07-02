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

Authentication Method
Use the following header in your requests for protected routes:

Authorization: Bearer my-secret-key
