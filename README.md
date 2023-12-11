# Cryptocurrency Notification System - Backend
- This is the backend application for the Cryptocurrency Notification System project. The backend is developed using Node.js (Express With TypeScript) and utilizes MongoDB as the database. Real-time notifications are implemented using Socket.io.

# Project Overview
- The backend is developed using Node.js and Express using type script. It includes features such as data scraping, watchlist management, and a notification system using socket.io.

# Getting Started
Follow these steps to set up and run the backend locally:

1 Installation
Clone the repository:
git clone https://github.com/watchmahesh/cryptocurrency-notification-system-backend.git

2 Install dependencies:
cd cryptocurrency-notification-system-backend
npm install

3 Set up the database:
Create a database and update the configuration in .env with your database details.

4 Configure Environment Variables:
Create a .env file in the root directory from .env.example and configure the necessary environment variables.

4 Run the application:
npm start dev

#Usage
Once the application is running, you can interact with it through the defined endpoints.

# Scraping Data
The application will automatically scrape data from https://coinranking.com/ every 5 minutes and save the
latest data to the configured database.

# Real-time Notifications
When the price of a cryptocurrency goes below the minimum or above the maximum value specified in the watchlist, a notification will be logged.For real time notification i have used socket.io

# File Structure
- src       // Root folder all your code goes here
  - constants        // All constant.
  - controllers        // All controllers
  - routes             // All routes
  - services           // All Services with the logical part.
  - helper           // Helper Function
  - model           // All the database schema
- test

# Run the test
npm run test

# API Endpoints
- List Cryptocurrency:/api/v1/crypto/list
- add Watchlist: /api/v1/watchlist/add
- List Watchlist:/api/v1/watchlist/list

# Technologies Used
- Node Js (Express With TypeScript)
- Database Mongodb
- Socket.io for realtime notification.
- Used Jest for Unit testing.
