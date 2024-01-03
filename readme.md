# NodeJS Industry Standard Project Setup 

created this project by following the tutorial of chai aur code by Hitesh Chowdary
as part of revising my Backend Skills

## step 1 : create a node package

> npm init 

## step 2 : read me file for notes and documentation

**readme.md** add file

## step 3 : folder structure

create a **src** folder 

## step 4 : configuring git ignore

add **.gitignore** and fill it using generator 

> https://mrkandreev.name/snippets/gitignore-generator/#Node

## step 5 : why gitkeep

use **.gitkeep** to add files to git hub if they are not pushing because they are empty

## step 6 : folder for files

add a **public** folder so that all the images or  videos required will be present inside the folder

## step 7 : adding data to .envfile

add **.env** file such that which ever confidential files you dont want to show will be inside env and remember these will go into github but dont show in git hub

**.env.sample** is for the tutorial purpose and not necessary

## step 8 :  creating folder structure

inside src we have a certain folder structure which we should follow

we have the **app.js** and **index.js**

we have **controllers** **db**(for db connections) **routes** **models** **middlewares utils**

## step 9 : configuring prettier

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

## step 10 : installing prettier as dev dependency

install prettier and nodemon as dev dependencies using 

> npm i -D nodemon prettier 

## step 11 : connecting to database

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

## step 12 : hiding data with .env file

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

## step 13 : configure database connection to index.js

Now that we have connected our db connection we should now run the server on 
a particular port 

we use app.js to write the configuration of express and send it to the 
index.js to run on the server 

## step 14 : configuring middlewares using .use (like cors and other data related)

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

## step 15 : standardizing the asynchronous functions

we have asynchronous functions running instead of writing them as async 
multiple times we can use it as utility by only writing it once.

we can do this multiple ways using .then.catch and also by using promises 

both uses the higher order functions 

you can find it at 
> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/asyncHandler.js">src/utils/asyncHandler.js</a> 

## step 16 : standarizing the errors and responses

you can see that everytime we have to write the errors so we can also 
standardize the errors by creating a class of errors and modify the Error class 
already given by Node

you can find the class at 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/apiErrors.js">src/utils/apiErrors.js</a> 

similarly we have api responses coming for every request 

we can also standardize the requests and codes most of the times will be success codes 

you can find the class at 

> <a href = "https://github.com/SaiEswar15/Backend-Revision-Chai-aur-code/blob/main/src/utils/apiResponses.js">src/utils/apiResponses.js</a> 

## step 17 : creating models using mongoose {Schema and  model}

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

## step 18 : using timestamps in mongoose model

use timestamps so that createdAt and updatedAt will be available 

## step 19 : using mongoose-aggregate-paginate-v2 as plugin for mongoose

> npm i mongoose-aggregate-paginate-v2 which gives additional functionalities to search

> import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

and use it just before creating a model as a plugin given by mongoose

videoSchema.plugin(mongooseAggregatePaginate)

## step 20 : encrypting the password with bcrypt

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


## step 21 : validating or comparing encrypted password with bcrypt

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

## step 22 : generating json web token

as of now our password is encrypted and added to database 
but we cannot enter our password everytime we want to enter a website

so we use tokens :

when we first signup/login there will be access tokens and refresh tokens generated 

these will be present in cookies and sessions so that we dont need to login everytime

jsonwebtoken will take the values and secretkey and generate a token and everytime the 
website is visited token will be verified and gven an access.

where will we generate the token ?

just before saving the model we generate the access and refresh tokens 
which will have  a certain expiry date

> npm i jsonwebtoken

> import jwt from "jsonwebtoken"

we create a function which will generate the token 
we use the custom method which is provided by mongoose 

> userSchema.methods.generateAccessToken = function(){}

genearlly the token is generated immedietly so no need of async function
we should use regular function instead of arrow to acess the variables in userSchema
if needed you can use async also

generating a token 

> jwt.sign({ _id,username,email },secret,{expiresIn : 1d})

it will take params 
1. object which contains _id,username,email
2. secret key 
3. object which contains property { expiresIn : 1d}

since we have to give id name and email from our class we should use this

> jwt.sign(
    { 
        _id : this._id,
        username : this.username,
        email : this.email 
    },
    secret,
    {
        expiresIn : 1d
    })

we will return the generated acess token 

        userSchema.methods.generateAccessToken = function()
        {
            return jwt.sign(
            { 
                _id : this._id,
                username : this.username,
                email : this.email 
            },
            secret,
            {
                expiresIn : 1d
            })
        }

similarly generate the refresh token and update it to refresh token
and we can save the model

## step 23 : creating a controller


now we have to write the controllers

let us consider registering the user 
whenever you have to solve the problem first you have to break
down the problem into multiple steps so that it makes the task easier

to register the user :
1. we have to recieve the data from the frontend and detructure the data
2. we have to check whether all fields are filled in the data or give an error
2. 2.1 check if the username or email already exists
3. we get the files from frontend like avatar and cover pic
4. if they are present we will check and if not will give error
5. if files came we will save them in local using multer config
6. we will store them in cloudinary.
7. check weather they are uploaded sucessfully to cloudinary and get the url
8. entry to database.
9. check if user is entered or not.
10. we send response removing the secret data feilds

before creating a controller of registering user 
we have to use the asyncHandlerPromises util to make the controller async

for this import the asyncHandlerpromises from utils and wrap your function 
inside this higher order function so that it becomes async

## step 24 : creating routes 

provide the routes 
dont provide all routes at one place 

inside routes folder create one file which represents all routes
and then provide different files for all routes

inside allRoutes : main root route will contain
ex : authentication, cart, search, wishlist route etc 

and each will have detailed routes like 
authentication - register, login, etc

you can see the classifiaction in routes folder

## step 25 : using postman

Now run the index file and pass the route in the postman and check for errors 
if server is running successfully 
then proceed with the logics 

## step 26 : test your code and solve errors

### error finding the public folder
you might not be able to upload files into public folder 
by just writing destination : {"/public"}

you should first get the path and the directory name as shown in
src/middleware/multer.js

use these instead if you are using cjs

    import { fileURLToPath } from 'url';
    import { dirname, join } from 'path';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const destinationPath = join(__dirname, '..', '..', 'public') ;

so now you can upload the files into public folder

## step 27 : cloudinary error

you can use 
> import cloudinary from "cloudinary"

instead like given in documentation
import {v2 from cloudinary} from "cloudinary"

because the uploader uses cloudinary.v2.uploader.upload()

## step 28 : unlinking public files

generally as soon as we upload files of avatar and coverImage 
we can directly push the images into cloudinary 

but in industry level the code is 2 step process 

firstly they upload the files to the local public folder 
and from the local they give path to cloudinary 

after the link is generated they unlink the files in public (delete)

if by any chance the uploading to cloudinary failes the file from 
public folder will also get removed 

This is the standard practice we generally do in industry level.

## step 29 : empty cover page error

as written in the code if we dont send the coverImage 

there will be  avatar so req.files will be true 
but req.files has only avatar[0]
there will be no coverImage[0] which will give an error 
>   TypeError: Cannot read properties of undefined (reading '0')
    at file:///E:/WORKSPACE/NODE%20JS/Revision-Project/src/controllers/users.controller.js:30:54
so it is better to use a case where we check if the coverImage is present.

## step 30 : login user 

1. create a controller and put inside the asyncHandler utility
2. even if we put it in async handler still make it async function 
   because we will wait sometimes and use await.
3. dont forget to export 
4. write down the most important todos inside the login controller 
    the actual logic

4.1 firstly we will get the data from body 
4.2 we will check if the email and password are present
4.3 we will check if the user is present in the database
4.4 if user is present we will check if the password is correct by using model method which has bcrypt
4.5 if password is correct we will generate access token and refresh token
    by using model method
4.6 we will update the refresh token in database
4.7 store the tokens in cookie

**configration for cookies**

        const options = {
            httpOnly : false,
            secure : true
        }

why are we writing http only is because so that cookies can be updated 
only by http request which is server.

we can send the cookie in response like : 

>   res.status()
    res.send()
    res.json()

similarly

> res.cookie()

and the cookie will take the parameters 

> res.cookie("cookie_name", cookie, options)

we want to send access and refresh tokens so :

        res.cookie("accessToken", accessToken, options)
        res.cookie("refreshToken", refreshToken, options)


## Step 31 : What happens if we create a model with mongoose 

when the data is saved in the database with mongoose 
1. it checks scrictly for all the fields that are present or not.
2. checks for the type it was sent.
3. when we attach methods to the model there is a advantage
4. the advantage is later when you search for particular document in mongodb
5. there will be methods available which can be used on these document.

this is the major use of the model and we can just update and save the object
back to the database.

## step 32 : logout 

todo to logout 

1. first we have to clear the cookies 
2. after removing token from the cookie we should also remove the
   refreshToken present in the database for the particular user 
3. find the user and delete the refreshtoken
4. but how will we get the id 
   either when we user is logged in we gat the response user object with id 
   we should store it and send as param when logged out
   but it is from frontend now that we dont have frontend how ??

Answer : use middleware 

why we can use cookie for res as res.cookie because we used middleware
cokkie parser by using this we can access
cookie both in req.cookie and res.cookie because of cookie-parser
similarly we designed a middleware and inject our id inside route so that 
id can be acessed by both res and req similarly like cookie

**what happens inside middleware verify**

as the cookies were pushed by user login controller
1.we should use the accesstoken and verify with jwt and decode the token
2.this will give you an user object which contains _id
3.now inject this id into the req with new name like req.user 

you can see the code at 
> <a href="">src/middleware/auth.middleware.js</a>

inside logout controller you will get the req.user injected by middleware which 
will have the _id 
1.use this _id to find the user and then
2.remove the refreshtoken from the user document 
3.and then remove the cookies this will logout the user

you can see the code at 
> <a href="">src/controllers/users.controllers.js</a>


## step 33 : refreshing the expired token

as we already have generated access tokens and they will expire after one day

we use access tokens for keeping user loggedin 

now for every one day the user should put in details and login 

to prevent this we use the refresh tokens which will be stored in database

once the access tokens is failed, the user whenever hits any route there will 
be expiried token and it will say route on found.

in the frontend the user should write a code such that when ever there is
page not found thinking the accesstoken expired he should hit an endpoint in this case 

what does the endpoint do ?

it should generate the new access token and refresh tokens and update in the database 

1. how does the tokens accessed in endpoint - by cookies - get refresh token
2. we should find the user in the database to change the refresh token 
3. to find the user we should have _id which we will get if we decode the refresh token 
4. after decoding we will get the _id with which we will get the user and reresh token
5. compared the token from cookie and token in database
6. if they are same we should move forward and generate new access and refresh tokens 
7. add refresh token to db.
8. update the cookies.

now access token is ready and you can login however

## step 34 : controller to change existing password

1. we get the old password, new password and conf password from req.body
2. check if all feilds are present 
3. check if both new and conf password both are same 
4. validate the old password with password of db so that we know valid user is changing
5. if we need to validate we need _id which we will get from request.user 
   which comes from the middleware verify by using cookies
6. now get the user and update the password and then save
7. if needed again get the user and validate the new password with password of db 
8. if true then its a success changing your password.

## step 35 : get user data

1. you dont have to write any logic to get the user data because
2. you already have the middleware which verify by using your tokens and 
   push user data as req.user so just add middleware to the route.
3. just destructure the data and send it 




 