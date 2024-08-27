# Backend Overview

The backend of this project is built with Node.js and follows a layered architecture. It is designed to handle the data management for basketball player information, simulating a database with a JSON file. The backend provides services and API endpoints to facilitate communication with the frontend.

## Directory Structure

- **Model**: Contains classes that represent the structure of the objects managed by the application. These classes define the data format and are used to map information stored in the JSON file.

- **Service**: Handles business logic and data manipulation. It provides functions to access, update, and manage data within the JSON file, acting as a bridge between the model and the controllers.

- **Controller**: Contains API endpoints that expose backend functionality to the frontend. Controllers handle HTTP requests, invoke the appropriate services to process data, and return responses to the client.

- **Database**: Stores the JSON file that simulates a database table. This file is used to persist application data and is managed by the services.

## Functionality

- **Data Management**: The backend receives data from the frontend and stores it in a JSON file. This file simulates a database table, allowing for data persistence.
- **API Endpoints**: Provides endpoints for CRUD operations (Create, Read, Update, Delete) to manage player information. These endpoints interact with the services to process requests and return appropriate responses.
- **Service Layer**: Manages the business logic, handling operations such as reading from and writing to the JSON file, and ensuring data integrity.

## Usage

To get started with the backend, follow these steps:

1. **Install Dependencies**: Navigate to the backend directory and run `npm install` to install the necessary dependencies.
2. **Start the Server**: Run `npm start` to start the server. The backend will listen for incoming requests and handle data operations.

## Architecture

The backend is organized using a layered architecture similar to the MVC (Model-View-Controller) pattern:

- **Model**: Defines the data structure and format.
- **Service**: Handles business logic and data manipulation.
- **Controller**: Exposes API endpoints for client communication.
- **Database**: Simulates a database with a JSON file for data persistence.

This architecture ensures a clear separation of concerns, making the backend modular, maintainable, and scalable.
