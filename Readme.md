# Bus Tracker

**Bus Tracker** is a full-stack web application that provides real-time tracking of buses combining hardware, backend, and frontend technologies to deliver a seamless and efficient bus tracking experience.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Bus Tracking**: Get live updates on the location of buses.
- **Distance Calculation**: Calculates the distance between the bus and the user's stop.
- **Estimated Time of Arrival (ETA)**: Provides an estimated time for the bus to reach the user's stop.
- **Interactive Map**: Displays the bus and user locations on an interactive map using React-Leaflet.
- **User-Friendly Interface**: Simple and intuitive interface built with Next.js.

## Architecture

The Bus Tracker application consists of three main components:

1. **Hardware Component**:
   - An ESP32 device equipped with a Neo 6M GPS module is installed on the bus to provide real-time location data.

2. **Backend Component**:
   - Data from the GPS module is stored in a database using XAMPP and PHP.
   - A Node.js and Express.js backend fetches the location data from the database and provides it to the frontend.

3. **Frontend Component**:
   - A Next.js frontend fetches the data from the backend and displays it on an interactive map using React-Leaflet.
   - The website calculates the distance between the bus and the user, as well as the estimated time of arrival.

## Technologies Used

- **Hardware**: ESP32, Neo 6M GPS module
- **Database**: XAMPP, PHP
- **Backend**: Node.js, Express.js
- **Frontend**: Next.js, React, React-Leaflet
- **Mapping**: Leaflet

## Setup and Installation

### Prerequisites

- Node.js
- XAMPP

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Kalp22/Bus-Tracker.git
   cd Bus_Tracker/backend
   ```
2. Install dependancies:
    ```bash
    npm install
    ```
3. Start Backend Server:
    ```bash
    npm start
    ```

### Database Setup

1. Start XAMPP and run Apache and MySQL.
2. Import the provided SQL file into your MySQL database to set up the required tables.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd Bus_Tracker/frontend
    ```
2. Install dependancies:
    ```bash
    npm install
    ```
3. Start Frontend Server:
    ```bash
    npm run dev
    ```


