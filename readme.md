# Hai welcome to backend revision project 

I am creating this project by following the tutorial of chai aur code by Hitesh Chowdary

## step 1 : 

npm init 

## step 2 : 

readme.md add file

## step 3 : 

create a src folder 

## step 4 : 

add .gitignore and fill it using generator 

https://mrkandreev.name/snippets/gitignore-generator/#Node

## step 5 : 

use .gitkeep to add files to git hub if they are not pushing because they are empty

## step 6 : 

add a public folder so that all the images or  videos required will be present inside the folder

## step 7 : 

add env file such taht which ever confidential files you dont want to show will be inside env and remember these will go into github but dont show in git hub

.env.sample is for the tutorial purpose and not necessary

## step 8 : 

inside src we have a certain folder structure which we should follow

we have the app.js index.js 

we have controllers db(for db connections) routes models middlewares utils 

## step 9 :

add prettier to make the code consistant so that whole team writes the similar code with similar annotations.

add folders .prettierrc and settings code inside it 

{
    "singleQoute" : false,
    "bracketSpacing" : true,
    "tabWidth" : 2,
    "trailingComma" : "es5",
    "semi" : true

}

and also add .prettierignore and add what you dont want to change like

/.vscode
/node_modules
/.dist

*.env
.env
.env.*

## step 10 :

install prettier and nodemon as dev dependencies using 

npm i -D nodemon prettier 

## step 11 :

now you should connect to the database of mongodb 

instead of writing the whole code in index.js write the code 
seperately in db folder index.js 

your db may be in your region or far away region so it is not a 
good practice to just connect directly 

the best practice is to use async programming so that it takes
its time to connect to database 

since there may be errors in connecting to the database so 
inorder to solve these errors use the try catch blocks 
so that the process exits if not connected and has errors 

its safe to use the connection URI inside .env file so that it doesnt get exposed

since it is wriiten inside the db.index.js file we should trigger it from index.js 

so it is better to write it as a function and export it so that we can use it 
by importing in index.js

## step 12 :

we should configure the dotenv and specify its path 

for this we should use require 

but since we are using ejs we cannot use require so use the import 

<h2>import dotenv from "dotenv";</h2>

<h2>dotenv.config({path : "./env"})</h2>

but still it may not work because it is still experimental for ejs so 
inside your package.json and dev : use 

<h2>
    "scripts": 
    {
        "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
        "start": "node src/index.js"
    },
</h2>

now it shall work

## step 13 :

Now that we have connected our db connection we should now run the server on 
a particular port 

we use app.js to write the configuration of express and send it to the 
index.js to run on the server 

## step 14 :

we should add middlewares 

firstly when we access the server from the frontend there may be 
cross origin server errors for which we should configure the cors 

> npm i cors

now we have different type of data coming from the frontend like :

req.params - with different encoding so we should use express.urlencoded()
req.body or json data - which should be handled express.json()
images or pdf files - which should be handled using express.static()

since they are middlewares they should be used by app.use()

to acess the cookies and modify the cookies we should use cookie-parser

>npm i cookie-parser 

since this is also a middleware we should use in app.use()






