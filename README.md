# E-Commerce REST API Documentation

## Introduction

Welcome to the E-Commerce Rest API, a simple Node.js-based API that allows users to register, login . Additionally, administrators can register, add product, remove product , update product and view the products . This documentation provides an overview of the project structure, functionality, and usage.

## Project Context

This project is developed by our team, [Dijkstra](#developers), for the Software Project Lab (SWE 4304) during the 3rd semester at the Islamic University of Technology. It represents one of the initial projects undertaken by our team during the early stages of our academic journey.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Usage](#usage)
    - [User Operations](#user-operations)
    - [Admin Operations](#admin-operations)
4. [Endpoints](#endpoints)
5. [Developers](#developers)

## Project Structure

The E-Commerce REST API adopts the **Model-View-Controller (MVC) design pattern**, a widely employed architectural principle in software development. This pattern partitions the application into three cohesive elements:

***model:*** Manages data handling and encapsulates the core business logic of the application.

***middleware:*** Concerned with the presentation layer and the user interface, ensuring that data is displayed appropriately to users.

***routes:*** Acts as an intermediary, processing user inputs, modifying the model as necessary, and updating the view accordingly.


#### The E-Commerce Rest API project is organized as follows:

- **model:**
  - orderModel.js, productModel.js, userModel.js

- **middleware:**
  - auth.js, roleCheck.js

- **routes:**
  - index.js

- **utils:**
  - fileUtils.js, jwt.js

- **controller:**
  - authController.js, orderController.js , productController.js

- **data:**
  - orders.json, products.json, users.json

- **Others:**
  - node_modules (dependencies folder), package-lock.json, package.json, server.js

## Installation and How To Use E-Commerce Rest API

### Prerequisites:

Before you begin, make sure you have the following installed on your machine:

1. **Node.js:** The E-Commerce Rest API is built using Node.js. Download and install it from [https://nodejs.org/](https://nodejs.org/).

2. **Git:** You'll need Git to clone the repository. Install it from [https://git-scm.com/](https://git-scm.com/).

### Installation Steps:

#### 1. Clone the GitHub repository:

Open your terminal (Command Prompt, PowerShell, or Terminal) and run the following command to clone the repository to your local machine:

```bash
git clone https://github.com/nafisreza/vanillajs-rest-api.git
```

#### 2. Navigate to the project directory:

Move into the project directory using the `cd` command:

```bash
cd vanillajs-rest-api
```

#### 3. Install project dependencies:

Use npm (Node Package Manager) to install the required dependencies:

```bash
npm install
```

### Running the E-Commerce Rest API:

#### 1. Start the server:

Run the following command to start the E-Commerce Rest API server:

```bash
npm start
```

This command will launch the server, and you should see output indicating that the server is running.

#### 2. Access the API:

You can access the API at `http://localhost:3000` by default. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to interact with the E-Commerce Rest API.

### Recommended IDEs:

While you can use any text editor for working with Node.js projects, here are some popular Integrated Development Environments (IDEs) that you might find useful:

1. **Visual Studio Code (VSCode):** Download and install from [https://code.visualstudio.com/](https://code.visualstudio.com/).

2. **Atom:** Download and install from [https://atom.io/](https://atom.io/).

3. **WebStorm:** A powerful IDE for JavaScript, you can find it at [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/).

### API Testing:

You can test the endpoints with this Postman Collection: [E-Commerce Rest API-Postman-Collection]


## Usage

### User Operations

#### 1. User Registration

To register a new user, send a POST request to `/register` with the user's information in the request body.

#### 2. User Login

To log in as a user, send a POST request to `/login` with the user's credentials in the request body. Successful login returns an access token.


### Admin Operations

#### 1. Admin Registration

To register a new admin, send a POST request to `/admin/register` with the admin's information in the request body.

#### 2. Admin Login

To log in as an admin, send a POST request to `/admin/login` with the admin's credentials in the request body. Successful login returns an access token.





