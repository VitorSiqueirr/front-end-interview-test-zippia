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
  auxiliary/
    table.js
  components/
    Button.jsx
    Error.jsx
    Input.jsx
    Pagination.jsx
    TableBody.jsx
    TableHeader.jsx
    Title.jsx
    UserDetailsModal.jsx
    UserFilter.jsx
    UserTable.jsx
  const/
    table.js
  contexts/
    context/
    provider/
  hooks/
    useCloseModal.jsx
    useError.jsx
    useUsers.jsx
  App.jsx
  main.jsx
  styles/
    index.css
    App.css
    Error.css
    Title.css
    UserDetailsModal.css
    UserFilter.css
    UserTable.css
tests/
  api/
    fetch.test.js
  components/
    UserFilter.test.jsx
  hooks/
    useCloseModal.test.jsx
    useError.test.jsx
    useUsers.test.jsx
  support/
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

In the project directory, run the script:

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

## How to run the tests using Vitest

I couldn't do all the tests because of the relative short spam to deliver the project, but i did it the best i could with that time.
In the project directory, run the following script:

```sh
npm run test
```

Or

```sh
yarn test
```

## Styles

The styles are defined in the [`src/styles`] folder.
And this project doesn't have a mobile style, only desktop version, to better visualize please use a desktop.
