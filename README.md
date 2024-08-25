# Zippia Frontend Developer Test Project - By Vitor Siqueira

This is the project for the frontend developer test, with the main objective to:

- Develop a fully functional web application capable of fetching and presenting intricate user data from a designated external API.

- This task is designed to rigorously assess your proficiency in manipulating the DOM, handling intricate JavaScript objects, and effectively interacting with an external API in real-time.

## Project Structure

```
index.html
src/
  api/
    fetch.js
  App.css
  App.jsx
  components/
    UserDetailsModal.jsx
    UserFilter.jsx
    UserTable.jsx
  index.css
  main.jsx
tests/
  components/
    UserDetailsModal.test.jsx
    UserFilter.test.jsx
    UserTable.test.jsx
  support/
    mockServer.js
    setup.js
```

## Prerequisites

- Node.js 20.11.1
- yarn 1.22.21 or npm 10.2.4

## Installation

1. Clone the git repository:

```sh
git clone https://github.com/VitorSiqueirr/front-end-interview-test-zippia.git
cd front-end-interview-test-zippia
```

2. Install the dependencies:

```sh
npm install
```

Or

```sh
yarn
```

## How to run the project in development

In the project directorie, run the script:

```sh
npm run dev
```

Or

```sh
yarn dev
```

Run the application in development mode.\
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in the browser.

## How to run the project in production mode

In the project directory, run the following script:

```sh
npm run build
```

Or

```sh
yarn build
```

This will compile the application for production in the [`dist`] folder. It correctly bundles React in production mode and optimizes the build for best performance.

To preview the compiled application locally, run the script:

```sh
npm run preview
```

Or

```sh
yarn preview
```

Run the application in production mode.\
Open [http://localhost:4173/](http://localhost:4173/) to view it in the browser.

## How to run the tests using Jest

In the project directory, run the following script:

```sh
npm run test
```

Or

```sh
yarn test
```

## Component Structure

- `UserDetailsModal.jsx`: Modal component to display user details.
- `UserFilter.jsx`: Component for the input of filtering users.
- `UserTable.jsx`: Table component to display the list of users.

## Styles

The styles are defined in the [`src/App.css`] file.
