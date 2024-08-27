# CSV-to-Cards
# Project Overview

The goal of this project is to create an interface that reads files, transforms the data into a list of objects, and displays these objects as cards. Communication between components is managed through props, allowing data to flow between parent and child components.

On the backend, the data is received, stored in a JSON file simulating a database table, and managed through services and controllers. The architecture of the project follows principles similar to the MVC (Model-View-Controller) pattern, with a clear separation between data logic, presentation, and backend communication.

## Frontend Description

The frontend of the project is built using React and is structured as follows:

- **Model**: The `model` folder contains classes that define the structure of the data used in the application. These classes are responsible for representing and validating the objects manipulated by the frontend.

- **Pages**: The `pages` folder contains the main user interface components. Each page includes various `.ts` components and their respective `.css` files for styling. These components are responsible for rendering the UI and interacting with the data.

- **Service**: The `service` layer is responsible for managing communication with the backend. It makes API calls, handles the responses, and provides the necessary data to the UI components. This layer acts as an intermediary between the view layer and the backend.

## Backend Description

The backend of the project is built with Node.js and follows a layered architecture:

- **Model**: The `model` folder contains classes that represent the structure of the objects managed by the application. These classes define the data format and are used to map the information stored in the JSON file.

- **Service**: The `service` layer handles business logic and data manipulation of the JSON file. It provides functions to access, update, and manage data, acting as a bridge between the model and the controllers.

- **Controller**: The `controller` folder contains API endpoints that expose backend functionality to the frontend. Controllers handle HTTP requests, invoke the appropriate services to process data, and return responses to the client.

- **Database**: The `database` folder stores the JSON file that simulates a database table. This file is used to persist application data and is managed by the services.



![image](https://github.com/user-attachments/assets/858e6524-5d3e-420b-ab70-192c6ed2ea00)

## Installing Dependencies

To get started with the project, you need to install the required dependencies for both the backend and frontend. Use the following command:

**npm install**

