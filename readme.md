# Hai welcome to backend revision project 

I am creating this project by following the tutorial of chai aur code by Hitesh Chowdary

## step 1 : 

> npm init 

## step 2 : 

**readme.md** add file

## step 3 : 

create a **src** folder 

## step 4 : 

add **.gitignore** and fill it using generator 

> https://mrkandreev.name/snippets/gitignore-generator/#Node

## step 5 : 

use **.gitkeep** to add files to git hub if they are not pushing because they are empty

## step 6 : 

add a **public** folder so that all the images or  videos required will be present inside the folder

## step 7 : 

add **.env** file such taht which ever confidential files you dont want to show will be inside env and remember these will go into github but dont show in git hub

**.env.sample** is for the tutorial purpose and not necessary

## step 8 : 

inside src we have a certain folder structure which we should follow

we have the **app.js** and **index.js**

we have **controllers** **db**(for db connections) **routes** **models** **middlewares utils**

## step 9 :

add prettier to make the code consistant so that whole team writes the similar code with similar annotations.

add folders **.prettierrc** and settings code inside it 
>   {
        "singleQoute" : false,
        "bracketSpacing" : true,
        "tabWidth" : 2,
        "trailingComma" : "es5",
        "semi" : true
    }

you can see at :

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/.prettierrc">.prettierrc</a>

and also add **.prettierignore** and add what you dont want to change like

> /.vscode
> /node_modules
> /.dist
 
> *.env
> .env
> .env.*

you can see at 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/.prettierignore">.prettierignore</a>

## step 10 :

install prettier and nodemon as dev dependencies using 

> npm i -D nodemon prettier 

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

you can see the code at : 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/db/index.js">src/db/index.js</a>

## step 12 :

we should configure the dotenv and specify its path 

for this we should use require 

but since we are using ejs we cannot use require so use the import 

> import dotenv from "dotenv";

> dotenv.config({path : "./env"})

but still it may not work because it is still experimental for ejs so 
inside your package.json and dev : use 

>  "scripts": 
    {
        "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js",
        "start": "node src/index.js"
    },


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

> npm i cookie-parser 

since this is also a middleware we should use in app.use()

## step 15 :

we have asynchronous functions running instead of writing them as async 
multiple times we can use it as utility by only writing it once.

we can do this multiple ways using .then.catch and also by using promises 

both uses the higher order functions 

you can find it at 
> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/asyncHandler.js">src/utils/asyncHandler.js</a> 

## step 16 :

you can see that everytime we have to write the errors so we can also 
standardize the errors by creating a class of errors and modify the Error class 
already given by Node

you can find the class at 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/apiErrors.js">src/utils/apiErrors.js</a> 

similarly we have api responses coming for every request 

we can also standardize the requests and codes most of the times will be success codes 

you can find the class at 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/apiResponses.js">src/utils/apiResponses.js</a> 








