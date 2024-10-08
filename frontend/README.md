# Frontend Overview

The frontend of this project is built using React and is designed to handle and display basketball player information from CSV files. The application is divided into three main components to manage different aspects of the user interface and data manipulation.

## Components

### 1. **FileReader**

The `FileReader` component is responsible for reading CSV files and parsing the data. It passes the filtered data to the `CardGenerator` component, which creates a card for each line in the CSV file. This component handles file input and data processing, ensuring that only relevant data is passed to the next component.

### 2. **CardGenerator**

The `CardGenerator` component receives the filtered data from `FileReader` and generates a card for each player. Each card displays player information extracted from the CSV file. The component allows for the addition, deletion, and editing of cards. This functionality is achieved by passing props both from parent to child and vice versa, enabling seamless updates and interactions between components.

### 3. **Card**

The `Card` component represents the individual player cards. It is styled according to the selected team and provides options for modifying player details. This component is used by `CardGenerator` to render the player information in a visually appealing format.

## Functionality

- **Reading Files**: The application can read and parse CSV files containing basketball player information. No data validation or treatment has been applied, so the data must be in the correct format (string, string, number, boolean), and there must be no commas in the file.
- **Data Display**: Player information is displayed in cards, with each card showing unique details based on the specifics of each player from the CSV file.
- **Card Management**: Users can add, edit, and delete cards. Changes are managed through props, allowing updates to be reflected across components.
- **Styling**: Components are styled based on the selected team, providing a customized look and feel.

## Usage

To get started with the frontend, follow these steps:

1. **Install Dependencies**: Navigate to the frontend directory and run `npm install` to install the necessary dependencies.
2. **Run the Application**: Start the development server by running `npm start` and open the application in your browser.

This structure ensures a modular and maintainable codebase, with clear separation between data handling and presentation logic. The interaction between components is managed efficiently through props, enhancing the user experience with dynamic and interactive card management.
