# yumble

Yumble is an application designed to help you find food with your friends. An innovative combination of dating apps such as Tinder and Bumble, with fast paced competitive apps such as Kahoot, Yumble helps you and your friends find food, *fast*. The website can be found [here](https://yumble.xyz).

Please review the [documentation](https://github.com/we-are-number-1/yumble/wiki) for information and guidelines on the software.

## Installation

This repository uses [npm](https://www.npmjs.com/get-npm) for dependency management. To install yumble locally, in the root directory of the repository, run:
```npm run install-full```

## Starting the application

Make sure to have installed the project first.

#### Backend

Before starting the backend, you will need to create a `.env` file in the `backend` folder. Put your teams dev environment Mongo Atlas key (see [how to make a Mongo Atlas dev database](https://github.com/we-are-number-1/yumble/wiki/MongoDB-Atlas)) in the `.env` file, prefixed with `ATLAS_URI=`. Additionally, to make Google API work you must also add your Google API key prefixed with `GOOGLE_API_KEY=`. Information on how to acquire a Google API key can be found [here](https://github.com/we-are-number-1/yumble/wiki/Working-with-Google-Maps-JavaScript-API). 

The backend folder has a `.env.example` file that can be copied, renamed, and modified for use as the `.env`.

To start the backend after adding the `.env` file, run `npm start` in either the root or backend folder.

#### Frontend

Simply run `npm start` in the frontend folder or `npm run start-frontend` in the root folder.
