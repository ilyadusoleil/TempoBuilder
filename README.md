# TempoBuilder

TempoBuilder is a desktop app to help you manage the practicing of musical etudes. Based on the this [blog post](https://thatsnotspit.com/2019/03/26/practice-program/) by Ryan Beach, Tempobuilder does all the heavy lifting to generate a practice plan for the etude you want to practice. TempoBuilder will guide you, day by day through which sections and tempos to practice to get you performance ready. With an inbuilt metronome, and ability to upload sheet music, it is a one stop shop to help optimize your practice sessions.

## Demo

Try it out here: https://tempobuilder.heroku.com/

## Getting Started
These instruction will help you setup a local development instance of the app.

#### Get the repo
```
git clone https://github.com/ilyadusoleil/tempobuilder.git
cd tempobuilder
```

#### Install dependencies
`npm i`

#### Setup prerequisites
For an example on how to fill in `/server/.env` see `/server/.env.example` For an example how to fill `/client/.env.local` see `/client/.env.local.example`

#### Database
Set up a mongoDB database locally or as a hosted service and add the database URI in `/server/config/config.env`

#### Authentication
Set up an keys with [Google](https://console.developers.google.com/apis/dashboard) and update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `/server/config/config.env`

#### APIs
- [Cloudinary](https://cloudinary.com/): create an account and add API keys in `/server/config/config.env`

### Start the App

Start client and server in dev mode locally

From the root folder of the project change into `/server` and `npm start`
From the root folder of the project change into `/client` and `npm start`

## Tech Stack

### Frontend
- [Reactjs](https://reactjs.org)
- [Emotion](https://emotion.sh/)
- [GSAP](https://greensock.com/gsap/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Passport](http://www.passportjs.org/)

## Author

* Hamish Chan - [Github](https://github.com/ilyadusoleil) - [LinkedIn](https://www.linkedin.com/in/hamish-chan/)