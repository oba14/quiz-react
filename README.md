[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oba14/quiz-react/blob/master/LICENSE) [![react version](https://img.shields.io/badge/react-16.12-blue)](https://www.npmjs.com/package/react) [![npm](https://img.shields.io/npm/v/npm)](https://nodejs.org/en/download/package-manager/) [![redux](https://img.shields.io/badge/redux-4.04-blue)](https://www.npmjs.com/package/redux) [![express](https://img.shields.io/badge/express-4.17.1-blue)](https://www.npmjs.com/package/express)

<h1 align="center">
Quiz app created using React with Redux.
  </h1>
<p> 
A Quiz App having a frontend in React and a backend with an express server. Quiz questions are generated from an opensource trivia database  (https://opentdb.com/) having around 4000 questions divided in 23 categories.
React hooks are used that let us use state and other react features without having to write classes.  
</p>

### Quiz App can be accessed on heroku using following link
- [Quiz App](https://quiz-app-oa.herokuapp.com/)

## Prerequirements

- [Node](https://nodejs.org/en/download/) ^16.12.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)

```terminal
$ cd client
$ npm i       // install pacakges
$ npm start  // start the server
```

## Server-side usage(PORT: 5000)

```terminal
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ npm sart    // run it locally
```

# Dependencies(tech-stacks)

| Client-side              | Server-side                   |
| ------------------------ | ----------------------------- |
| axios: ^0.19.0           | body-parser: ^1.15.2          |
| reactstrap: 8.2.0        | cors: ^2.8.1                  |
| react: ^16.9.0           | dotenv: ^2.0.0                |
| react-dom: ^16.9.0       | express: ^4.14.0              |
| react-redux: ^4.0.0      |morgan: ^1.7.0                 |
| react-router-dom: ^5.1.2 |                               |
| redux: ^4.0.0            |                               |
| redux-thunk: ^2.3.0      |

### License

[MIT](https://github.com/oba14/quiz-react/blob/master/LICENSE)
