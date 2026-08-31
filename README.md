# Tic Tac Toe

A full-stack Tic Tac Toe web application developed as a personal project to practice building applications with **React, JavaScript, CSS, Java, Spring Boot, and PostgreSQL**.

The application allows users to create an account, log in, or play as a guest. Once logged in, players can start a game, make moves, and play until there is a winner or a draw.

## Technologies

### Frontend

* React
* JavaScript
* CSS
* Vite
* Axios
* React Router

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok

## Features

### Authentication

* User registration
* User login
* Guest login
* Logout
* Player information stored in `localStorage`

### Game

* Create a new game
* 3x3 Tic Tac Toe board
* Turn management
* Player symbols (`X` / `O`)
* Move validation
* Winner detection
* Draw detection
* Game status
* Error handling
* Start a new game

### Interface

* Responsive layout
* Neumorphic design
* Interactive buttons and game cells
* Visual distinction between `X`, `O`, errors, and game results

## Architecture

The project is divided into two main applications:

```text
tictactoe/
│
├── frontend/
│   └── React + Vite
│
└── backend/
    └── Spring Boot
```

The frontend communicates with the backend through REST APIs using Axios.

The backend handles the application logic, game rules, player management, and database communication.

```text
React
  ↓
Axios
  ↓
REST API
  ↓
Spring Boot Controllers
  ↓
Services
  ↓
Repositories
  ↓
PostgreSQL
```

## API

### Players

#### Create player

```http
POST /api/players
```

#### Login

```http
POST /api/players/login
```

### Games

#### Create game

```http
POST /api/games
```

#### Get game

```http
GET /api/games/{id}
```

#### Make a move

```http
POST /api/games/{id}/moves
```

The frontend only sends the selected board position when making a move. The backend is responsible for validating the move and determining the resulting game state.

## How to Run

### 1. Clone the repository

Clone the repository to your local machine.

### 2. Set up PostgreSQL

Create a PostgreSQL database for the application.

For example:

```text
Database: tictactoe
```

### 3. Configure the backend

Update the Spring Boot configuration with your PostgreSQL connection details.

For example, configure:

```text
spring.datasource.url
spring.datasource.username
spring.datasource.password
```

### 4. Run the backend

Open the backend project with IntelliJ IDEA or another Java IDE and run the Spring Boot application.

The backend runs by default on:

```text
http://localhost:8080
```

### 5. Run the frontend

Navigate to the frontend directory and install the dependencies:

```bash
npm install
```

Then start the Vite development server:

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite.

## Guest Players

The application supports playing as a guest.

When a user chooses **Play as guest**, the frontend generates a temporary username and creates a player through the backend before starting the game.

Guest-player cleanup could be implemented in the future so that inactive guest accounts are automatically removed after a certain period.

## Project Status

**Completed**

The main functionality of the application is implemented, including authentication, guest access, game creation, moves, game results, error handling, and the user interface.

Future improvements may include additional features, testing, security improvements, and deployment.
