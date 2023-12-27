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

## step 17 :

creating a models which should go into the database 

for this we use the mongoose

> import mongoose from "mongoose"

we should also extract {Schema} from mongoose

now we should create a new Schema 

> new Schema({})

assign it to the variable as schema

> usersSchema = new Schema({})

fill the feilds which you feel they should be present in the document/model

for example login database will contain name, password, email etc 

for every feild we should provide certain qualities like datatype, required, default, timestamps etc

you can find the models in models folder

now you should make it a model and export it 

export const <variable> = mongoonse.model(<nameofthedocument>, <variablenameofschema>)

> export const users = mongoonse.model("User", usersSchema)

## step 18 : 

use timestamps so that createdAt and updatedAt will be available 

## step 19 :

> npm i mongoose-aggregate-paginate-v2 which gives additional functionalities to search

> import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

and use it just before creating a model as a plugin given by mongoose

videoSchema.plugin(mongooseAggregatePaginate)

## step 20 :

> npm i bcrypt 

Now that we have model of users we have to provide password 
but if we send the password directly there may be case that they
may be misused so we should encrypt 

not only encrypt - we should also decrypt

but once encrypted we just dont put it in our database
we should know weather the encryted is equal to original password given 

so for this problem we use the bcrypt 

**Bycrypt just makes our password hash so that we can encrypt, compare and also decrypt**

Where should we use this ?

Before the model gets created with the details given

direct encryption is not possible so we have to make use
of mongoose hooks 

> pre hook (execute just before saving runs this code)

pre hook takes parameters - 

1. Task we are doing - "save"
2. and function in which we use bcrypt to encrypt password

userSchema.pre("save", ()=>{})

note that dont use arrow function like above because arrow functions doesnt contain the context so it is not recommended.
//instead use 

> userSchema.pre("save", function(){})

since encrpytion takes time make it a async function

> userSchema.pre("save", async function(){})

now inside the function encrypt the password 
you can acess the password using this keyword

convertion 

> bcrypt.hash(this.password)

now assign this encryption to modify before going into model

> this.password = bcrypt.hash(this.password)

after encryption is updated 
we have to save the model

how it will move to the save 
we should provide next and this is a middleware 
and contains next parameter

> userSchema.pre("save", async function(next){
    this.password = bcrypt.hash(this.password)
    next();
})

we can pass the no of salts or rounds along with password or it will remain default

> userSchema.pre("save", async function(next){
    this.password = bcrypt.hash(this.password, 10)
    next();
})

now we have a problem that this will keep encrypting 
for every change in the title or other feilds 

so we have to make it encrypt if there is password modified so 
we should check :

if(this.isModified("password")) is true it should modify

or should directly move to next()
so we can give the negative case

> if(!this.isModified("password")) return next();

the entire encrypting checking function looks like :

> userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next();
})


## step 21 : 

now we have encryted and sent to create model 

but before moving to create a model we have a problem 

we just cannot send whatever the encrypt password sent
to the model assuming it will work :
we should test whether the encryption is working or it 
randomly sent us some strings

for this we should create custom methods which will be 
provided by mongoose

<variable_name of schema>.methods.<method_name> = function

userSchema.methods.isPasswordCorerct = ()=>{}

as above there will be same difficulty that we cannot acess
this because of using the arrow function so 

we should go for normal function 

> userSchema.methods.isPasswordCorerct = function(){}

the comparation may takes some time so we should make it async

> userSchema.methods.isPasswordCorrect = async function(){}

now that our password is updated we should send it as parameter 
for the function

> userSchema.methods.isPasswordCorerct = async function(password){}

now inside the function you can write the logic to compare
bcrypt gives us the hook called compare

bcrypt.compare(this.password,password)

since we want to proceed after completing this process
we should wait till this completed

await bcrypt.compare(this.password,password)

we will return this which will give us boolean value true/false

> return await bcrypt.compare(this.password,password)

the final process will look like :

> userSchema.methods.isPasswordCorerct = async function(password)
{
    return await bcrypt.compare(this.password,password)
}




