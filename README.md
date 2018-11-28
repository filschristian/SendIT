
[![Build Status](https://travis-ci.com/filschristian/SendIT.svg?branch=develop)](https://travis-ci.com/filschristian/SendIT) [![Maintainability](https://api.codeclimate.com/v1/badges/f390eccb114564342ede/maintainability)](https://codeclimate.com/github/filschristian/SendIT/maintainability)
# SendIT

Send IT is a parcel delivery app developed in javascript, the app allows users to order a parcel delivery to any destination they want. The app provides courier quotes based on the weight of the parcel. With this app, the user can perform all operations related to his parcel delivery order (Create, Read, Update and Delete).

## Getting Started

These instructions will get you a copy of this project running on your local machine.

### Prerequisites

-Install Node JS and NPM
if you don't know how follow this link https://nodejs.org/en/download/

-Install a code editor in case you want to edit or change something.

-Install Postman to test the RestFull API endpoints. 

### Installing
A step by step series of examples that tell you how to get a development env running.

1. Clone/ download this repository to your local machine.
2. Open the terminal/ Command prompt.
3. Navigates to the project folder.
4. Type npm run dev to start the server.
5. navigate to postman and test the API endpoints (in the table below).
6. type npm run tests in the terminal/ command prompt to run tests.
 
## API endpoints Table
 
| Method |         Endpoints                 |            Action                  |
| -------|-----------------------------------| -----------------------------------|
| POST   | api/v1/auth/signup                | Register user                      |
| POST   | api/v1/auth/login                 | Login user                         |
| POST   | api/v1/parcels/                   | Create a parcel order              |
| PUT    | api/v1/parcels/:id/destination    | Changes the destination of a parcel|
| PUT    | api/v1/parcels/:id/status         | Changes the status of a parcel     |
| PUT    | api/v1/parcels/:id/presentLocation| Changes the location of a parcel   |
 
 ## Built with
 Express JS
 
 ## Author
 Rene Christian NSHOGOZA
