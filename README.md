# Cooking with Alexa VR
Unity VR cooking game integrated with Alexa

## Getting Started
These instructions will guide you through the setup process

### Unity Setup
Import files in CUhackit2019 folder to Unity

### Webserver Setup
Start by install Node.js

Install the [Heroku Toolkit](https://toolbelt.heroku.com/)

Inside install location, create folder node_module

Import files from ServerFiles into node_module folder

In a command line, enter the following
```
cd node_alexa
git init .
git add .
git commit -m "Init"
heroku apps:create "yourappname"
git push heroku master
heroku ps:scale = web 0
heroku ps:scale = web 1
```
Server should now be up and running at "https://yourappname.herokuapp.com"

### Alexa Skills Setup
Using files within AlexaSkills,

Import contents of intent.json into your intent schema

Import files from folder lambda to the lambda section of your Alexa Skill

## Running Game
Start interaction with Alexa by saying, "Alexa, start simulation"

Follow her prompts and have fun!
